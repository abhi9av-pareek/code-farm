import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const EXPLORE_CONTROL_EVENT = 'farm-explore-control'

type ExploreControlDetail = {
  code: string
  pressed: boolean
}

type ExploreControllerProps = {
  player: THREE.Group
  terrain: THREE.Object3D[]
}

const movementCodes = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight', 'ArrowLeft', 'ArrowRight'])
const cameraOffset = new THREE.Vector3()
const cameraTarget = new THREE.Vector3()
const desiredCameraPosition = new THREE.Vector3()
const forward = new THREE.Vector3()
const right = new THREE.Vector3()
const rayOrigin = new THREE.Vector3()
const down = new THREE.Vector3(0, -1, 0)
const characterHeight = new THREE.Vector3(0, 1.45, 0)

export function ExploreController({ player, terrain }: ExploreControllerProps) {
  const { camera, gl } = useThree()
  const pressed = useRef(new Set<string>())
  const yaw = useRef(0)
  const pitch = useRef(0.22)
  const raycaster = useRef(new THREE.Raycaster())

  useEffect(() => {
    const setControl = (code: string, isPressed: boolean) => {
      if (isPressed) pressed.current.add(code)
      else pressed.current.delete(code)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (!movementCodes.has(event.code)) return
      event.preventDefault()
      setControl(event.code, true)
    }
    const onKeyUp = (event: KeyboardEvent) => {
      if (!movementCodes.has(event.code)) return
      event.preventDefault()
      setControl(event.code, false)
    }
    const onControl = (event: Event) => {
      const detail = (event as CustomEvent<ExploreControlDetail>).detail
      if (detail && movementCodes.has(detail.code)) setControl(detail.code, detail.pressed)
    }
    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) return
      yaw.current -= event.movementX * 0.0032
      pitch.current = THREE.MathUtils.clamp(pitch.current - event.movementY * 0.0022, -0.08, 0.55)
    }
    const lockPointer = () => {
      if (document.pointerLockElement !== gl.domElement) gl.domElement.requestPointerLock?.()
    }

    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('keyup', onKeyUp, { passive: false })
    window.addEventListener(EXPLORE_CONTROL_EVENT, onControl)
    window.addEventListener('mousemove', onMouseMove)
    gl.domElement.addEventListener('pointerdown', lockPointer)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener(EXPLORE_CONTROL_EVENT, onControl)
      window.removeEventListener('mousemove', onMouseMove)
      gl.domElement.removeEventListener('pointerdown', lockPointer)
      if (document.pointerLockElement === gl.domElement) document.exitPointerLock()
    }
  }, [gl])

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05)
    const input = pressed.current
    const turn = (input.has('ArrowLeft') ? 1 : 0) - (input.has('ArrowRight') ? 1 : 0)
    yaw.current += turn * step * 1.5

    const forwardInput = (input.has('KeyW') ? 1 : 0) - (input.has('KeyS') ? 1 : 0)
    const sideInput = (input.has('KeyD') ? 1 : 0) - (input.has('KeyA') ? 1 : 0)
    if (forwardInput || sideInput) {
      forward.set(-Math.sin(yaw.current), 0, -Math.cos(yaw.current))
      right.set(Math.cos(yaw.current), 0, -Math.sin(yaw.current))
      const speed = input.has('ShiftLeft') || input.has('ShiftRight') ? 8 : 4.5
      player.position.addScaledVector(forward, forwardInput * speed * step)
      player.position.addScaledVector(right, sideInput * speed * step)
      const direction = forward.multiplyScalar(forwardInput).addScaledVector(right, sideInput).normalize()
      player.rotation.y = Math.atan2(direction.x, direction.z)
    }

    if (terrain.length) {
      rayOrigin.set(player.position.x, player.position.y + 20, player.position.z)
      raycaster.current.set(rayOrigin, down)
      const hit = raycaster.current.intersectObjects(terrain, true)[0]
      if (hit) player.position.y = hit.point.y
    }

    cameraTarget.copy(player.position).add(characterHeight)
    cameraOffset.set(Math.sin(yaw.current) * 7, 2.5 + pitch.current * 5, Math.cos(yaw.current) * 7)
    desiredCameraPosition.copy(cameraTarget).add(cameraOffset)
    camera.position.lerp(desiredCameraPosition, 1 - Math.exp(-7 * step))
    camera.lookAt(cameraTarget)
  })

  return null
}
