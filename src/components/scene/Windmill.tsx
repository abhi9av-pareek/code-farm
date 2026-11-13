import { useRef } from 'react'
import { useFrame, type ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'

type GroupProps = ThreeElements['group']

export function Windmill(props: GroupProps) {
  const blades = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (blades.current) blades.current.rotation.z -= delta * 1.4
  })

  return (
    <group {...props}>
      <mesh castShadow position={[0, 1.25, 0]}>
        <coneGeometry args={[0.38, 2.5, 4]} />
        <meshStandardMaterial color="#b7a27c" />
      </mesh>
      <mesh position={[0, 2.55, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#6c5a40" />
      </mesh>
      <group ref={blades} position={[0, 2.55, 0.14]}>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((rotation) => (
          <mesh key={rotation} rotation={[0, 0, rotation]} position={[0, 0.45, 0]}>
            <boxGeometry args={[0.09, 0.9, 0.08]} />
            <meshStandardMaterial color="#efe2bd" />
          </mesh>
        ))}
      </group>
    </group>
  )
}
