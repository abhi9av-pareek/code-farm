import type { ThreeElements } from '@react-three/fiber'

type GroupProps = ThreeElements['group']

export function Crops(props: GroupProps) {
  return (
    <group {...props}>
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, column) => (
          <group key={`${row}-${column}`} position={[column * 0.55, 0, row * 0.55]}>
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.04, 0.06, 0.35, 6]} />
              <meshStandardMaterial color="#628d3d" />
            </mesh>
            <mesh rotation={[0, 0, -0.5]} position={[-0.08, 0.28, 0]}>
              <planeGeometry args={[0.22, 0.08]} />
              <meshStandardMaterial color="#79aa4a" side={2} />
            </mesh>
            <mesh rotation={[0, 0, 0.5]} position={[0.08, 0.33, 0]}>
              <planeGeometry args={[0.22, 0.08]} />
              <meshStandardMaterial color="#6c9b42" side={2} />
            </mesh>
          </group>
        )),
      )}
    </group>
  )
}
