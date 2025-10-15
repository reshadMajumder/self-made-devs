"use client"

import { useFrame } from "@react-three/fiber"
import { Text3D, Environment } from "@react-three/drei"
import { useRef, useMemo, useState } from "react"
import * as THREE from "three"

function BigBangParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const [explosionPhase, setExplosionPhase] = useState(0)

  const particleCount = 200
  const codeSymbols = ["</>", "{}", "[]", "()", "=>", "fn", "if", "&&", "||", "=="]

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Start all particles at center (Big Bang origin)
      positions[i * 3] = 0
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0

      // Random explosion velocities in all directions
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const speed = 0.5 + Math.random() * 1.5

      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed
      velocities[i * 3 + 2] = Math.cos(phi) * speed

      // Vibrant colors - blue, purple, pink spectrum
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.23 // Blue
        colors[i * 3 + 1] = 0.51
        colors[i * 3 + 2] = 0.96
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.54 // Purple
        colors[i * 3 + 1] = 0.36
        colors[i * 3 + 2] = 0.96
      } else {
        colors[i * 3] = 0.96 // Pink
        colors[i * 3 + 1] = 0.36
        colors[i * 3 + 2] = 0.71
      }

      sizes[i] = 0.1 + Math.random() * 0.2
    }

    return { positions, velocities, colors, sizes }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.getElapsedTime()

    // Explosion phase: 0-2 seconds rapid expansion, then floating
    const currentPhase = Math.min(time / 2, 1)
    setExplosionPhase(currentPhase)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      if (currentPhase < 1) {
        // Explosion phase - rapid expansion
        positions[i3] += particles.velocities[i3] * 0.1
        positions[i3 + 1] += particles.velocities[i3 + 1] * 0.1
        positions[i3 + 2] += particles.velocities[i3 + 2] * 0.1
      } else {
        // Floating phase - gentle movement
        positions[i3 + 1] += Math.sin(time + i) * 0.001
        positions[i3] += Math.cos(time * 0.5 + i) * 0.001
      }

      // Keep particles in bounds
      if (Math.abs(positions[i3]) > 15) positions[i3] *= 0.99
      if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] *= 0.99
      if (Math.abs(positions[i3 + 2]) > 10) positions[i3 + 2] *= 0.99
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true

    // Rotate the entire particle system slowly
    particlesRef.current.rotation.y = time * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={particles.colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={particles.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingCodeSymbols() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  const symbols = [
    { text: "</>" as const, position: [0, 0, 0] as [number, number, number], color: "#3b82f6" },
    { text: "{" as const, position: [-3, 2, -2] as [number, number, number], color: "#8b5cf6" },
    { text: "}" as const, position: [3, -2, -2] as [number, number, number], color: "#8b5cf6" },
    { text: "(" as const, position: [-4, -1, 1] as [number, number, number], color: "#ec4899" },
    { text: ")" as const, position: [4, 1, 1] as [number, number, number], color: "#ec4899" },
  ]

  return (
    <group ref={groupRef}>
      {symbols.map((symbol, index) => (
        <group key={index} position={symbol.position}>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.5}
            height={0.1}
            curveSegments={12}
            position={[Math.sin(index * 1.5) * 0.2, Math.cos(index * 1.5) * 0.2, 0]}
          >
            {symbol.text}
            <meshStandardMaterial
              color={symbol.color}
              metalness={0.8}
              roughness={0.2}
              emissive={symbol.color}
              emissiveIntensity={0.3}
            />
          </Text3D>
        </group>
      ))}
    </group>
  )
}

function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!coreRef.current) return
    const time = state.clock.getElapsedTime()

    // Pulsating effect
    const scale = 1 + Math.sin(time * 2) * 0.2
    coreRef.current.scale.set(scale, scale, scale)

    // Rotation
    coreRef.current.rotation.x = time * 0.5
    coreRef.current.rotation.y = time * 0.7
  })

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[2.5, 2]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#3b82f6"
        emissiveIntensity={2}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  )
}

export function BigBangScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} color="#3b82f6" />
      <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />

      <EnergyCore />
      <BigBangParticles />
      <FloatingCodeSymbols />

      <Environment preset="night" />
    </>
  )
}
