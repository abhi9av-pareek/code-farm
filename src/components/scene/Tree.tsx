import type { ThreeElements } from '@react-three/fiber'

type GroupProps = ThreeElements['group']

export function Tree(props: GroupProps) {
  return (
    <group {...props}>
      <mesh castShadow position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 1.3, 8]} />
        <meshStandardMaterial color="#765033" />
      </mesh>
      <mesh castShadow position={[0, 1.5, 0]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#4f7f39" flatShading />
      </mesh>
      <mesh castShadow position={[-0.38, 1.85, 0.08]} scale={0.68}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#6a9445" flatShading />
      </mesh>
    </group>
  )
}
