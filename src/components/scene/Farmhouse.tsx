export function Farmhouse() {
  return (
    <group position={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[2.8, 1.4, 2.2]} />
        <meshStandardMaterial color="#d7b987" />
      </mesh>
      <mesh castShadow position={[0, 1.65, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.15, 1.15, 4]} />
        <meshStandardMaterial color="#8b4d34" />
      </mesh>
      <mesh position={[0, 0.55, 1.13]}>
        <boxGeometry args={[0.5, 0.95, 0.08]} />
        <meshStandardMaterial color="#593b2d" />
      </mesh>
      {[-0.78, 0.78].map((x) => (
        <mesh key={x} position={[x, 0.85, 1.13]}>
          <boxGeometry args={[0.45, 0.45, 0.08]} />
          <meshStandardMaterial color="#8bc2c7" emissive="#2b5e61" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}
