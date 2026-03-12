/**
 * Ballpit — inspired by react-bits Ballpit component
 * Uses Three.js (R3F) + proper physics via react-three-rapier
 * Each ball renders an SVG tech logo texture on its surface
 */
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

// Tech logos as SVG data URIs with brand colors
const TECH_ITEMS = [
  { name: 'React',      color: '#61DAFB', symbol: '⚛' },
  { name: 'JS',         color: '#F7DF1E', symbol: 'JS' },
  { name: 'TS',         color: '#3178C6', symbol: 'TS' },
  { name: 'Tailwind',   color: '#38BDF8', symbol: '🌊' },
  { name: 'Three.js',   color: '#E8FF00', symbol: '▲' },
  { name: 'GSAP',       color: '#00D26A', symbol: '💚' },
  { name: 'Vite',       color: '#A855F7', symbol: '⚡' },
  { name: 'Docker',     color: '#2496ED', symbol: '🐳' },
  { name: 'Figma',      color: '#A259FF', symbol: '✏' },
  { name: 'Git',        color: '#F05032', symbol: '⎇' },
  { name: 'PHP',        color: '#8892BF', symbol: 'PHP' },
  { name: 'MySQL',      color: '#F29111', symbol: '🗄' },
  { name: 'Redux',      color: '#764ABC', symbol: '∞' },
  { name: 'Django',     color: '#0C4B33', symbol: '🐍' },
  { name: 'CSS',        color: '#1572B6', symbol: '#' },
  { name: 'HTML',       color: '#E34F26', symbol: '<>' },
]

function Pointer() {
  const body = useRef()
  useFrame(({ pointer, viewport }) => {
    if (!body.current) return
    const x = (pointer.x * viewport.width) / 2
    const y = (pointer.y * viewport.height) / 2
    body.current.setNextKinematicTranslation({ x, y, z: 2 })
  })

  return (
    <RigidBody position={[0, 0, 2]} type="kinematicPosition" colliders="ball" ref={body}>
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </RigidBody>
  )
}

function Ball({ position, radius, tech }) {
  // Create canvas texture for the ball face
  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Background circle
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
    ctx.fillStyle = tech.color + '22'
    ctx.fill()

    // Border
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2)
    ctx.strokeStyle = tech.color
    ctx.lineWidth = 6
    ctx.stroke()

    // Symbol text
    ctx.fillStyle = tech.color
    ctx.font = `bold ${tech.symbol.length > 2 ? 64 : 96}px monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(tech.symbol, size / 2, size / 2 - 10)

    // Name text
    ctx.font = 'bold 32px monospace'
    ctx.fillStyle = tech.color + 'cc'
    ctx.fillText(tech.name, size / 2, size / 2 + 68)

    const tex = new THREE.CanvasTexture(canvas)
    return tex
  }, [tech])

  return (
    <RigidBody 
      colliders="ball" 
      position={position} 
      restitution={0.8} 
      friction={0.1}
      angularDamping={0.5}
      linearDamping={0.2}
    >
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.15}
          metalness={0.6}
          emissive={tech.color}
          emissiveIntensity={0.08}
        />
      </mesh>
    </RigidBody>
  )
}

function BallPitScene({ count = 16 }) {
  const balls = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const tech = TECH_ITEMS[i % TECH_ITEMS.length]
      return {
        id: i,
        tech,
        radius: 0.42 + Math.random() * 0.15,
        position: [
          (Math.random() - 0.5) * 6,
          2 + Math.random() * 4,
          (Math.random() - 0.5) * 2,
        ],
      }
    })
  }, [count])

  return (
    <Physics gravity={[0, -4, 0]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 6, 4]} intensity={2} color="#E8FF00" />
      <pointLight position={[-4, 4, -2]} intensity={1.5} color="#FF3CAC" />
      <pointLight position={[0, -2, 3]} intensity={1} color="#61DAFB" />
      
      {/* Invisible boundaries based on original bounds [5, 4, 2] */}
      <CuboidCollider position={[0, -4.5, 0]} args={[10, 0.5, 10]} />
      <CuboidCollider position={[0, 4.5, 0]} args={[10, 0.5, 10]} />
      <CuboidCollider position={[-5.5, 0, 0]} args={[0.5, 10, 10]} />
      <CuboidCollider position={[5.5, 0, 0]} args={[0.5, 10, 10]} />
      <CuboidCollider position={[0, 0, -2.5]} args={[10, 10, 0.5]} />
      <CuboidCollider position={[0, 0, 2.5]} args={[10, 10, 0.5]} />

      <Pointer />

      {balls.map((b) => (
        <Ball
          key={b.id}
          position={b.position}
          radius={b.radius}
          tech={b.tech}
        />
      ))}
    </Physics>
  )
}

export default function Ballpit({ count = 16, className = '' }) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 1, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <BallPitScene count={count} />
        </Suspense>
      </Canvas>
    </div>
  )
}
