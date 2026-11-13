import { OrbitControls, Sky, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { ExploreController } from './ExploreController'

const FARM_MODEL_URL = '/models/farm-world-textured.glb'

function FarmModel({ exploring }: { exploring: boolean }) {
  const { scene } = useGLTF(FARM_MODEL_URL)
  const { model, player, terrain } = useMemo(() => {
    const world = scene.clone(true)
    const terrainMeshes: THREE.Object3D[] = []
    world.traverse((object) => {
      if (object.name === 'FARM_TERRAIN_BASE') terrainMeshes.push(object)
    })

    if (!exploring) return { model: world, player: null, terrain: terrainMeshes }

    const characterParts = world.children.filter((object) => object.name.startsWith('ABHINAV_'))
    const character = new THREE.Group()
    character.name = 'ABHINAV_PLAYER'
    character.position.set(32, 0, 31.5)
    world.add(character)
    world.updateMatrixWorld(true)
    characterParts.forEach((part) => character.attach(part))
    return { model: world, player: character, terrain: terrainMeshes }
  }, [exploring, scene])

  useEffect(() => {
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }, [model])

  return (
    <>
      <primitive object={model} />
      {player && <ExploreController player={player} terrain={terrain} />}
    </>
  )
}

function FarmWorld({ exploring }: { exploring: boolean }) {
  return (
    <>
      <Sky sunPosition={[80, 70, 40]} turbidity={7} rayleigh={2.5} />

      <hemisphereLight args={['#dcefff', '#59633f', 1.6]} />
      <directionalLight
        castShadow
        intensity={3.2}
        position={[80, 100, 60]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />

      <Suspense fallback={null}>
        <FarmModel exploring={exploring} />
      </Suspense>

      {!exploring && (
        <OrbitControls
          enablePan={false}
          minDistance={45}
          maxDistance={250}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
          target={[7, 4, 0]}
        />
      )}
    </>
  )
}

export function FarmScene({ exploring = false }: { exploring?: boolean }) {
  return (
    <Canvas
      shadows
      camera={exploring ? { position: [32, 4, 38.5], fov: 55, near: 0.1, far: 500 } : { position: [95, 82, 118], fov: 42, near: 0.1, far: 500 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#b9d5e7']} />
      <FarmWorld exploring={exploring} />
    </Canvas>
  )
}

useGLTF.preload(FARM_MODEL_URL)
