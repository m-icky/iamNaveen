import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingOrb({ position, color, speed = 1, distort = 0.3 }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

function Ring({ position }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.4
      mesh.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })
  return (
    <Float speed={2} floatIntensity={0.8}>
      <mesh ref={mesh} position={position}>
        <torusGeometry args={[1.2, 0.04, 16, 100]} />
        <meshStandardMaterial color="#E8FF00" emissive="#E8FF00" emissiveIntensity={0.6} />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 120
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#E8FF00" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#E8FF00" />
      <pointLight position={[-5, -5, 3]} intensity={1} color="#3ccbffff" />
      <FloatingOrb position={[3.5, -1, -2]} color="#FF3CAC" speed={1.1} distort={0.3} />
      <Particles />
      <ambientLight intensity={0.3} />
      <FloatingOrb position={[-5.5, 3.5, -1]} color="#c300ffff" speed={0.8} distort={0.4} />
      <FloatingOrb position={[1.5, 2.5, -3]} color="#00FFCC" speed={0.6} distort={0.5} />
      <FloatingOrb position={[7.5, 1.5, -8]} color="#ff0000ff" speed={0.6} distort={0.5} />
      <Particles />
    </Canvas>
  )
}

const skillsData = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Three.js', color: '#E8FF00' },
  { name: 'Framer Motion', color: '#FF3CAC' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'TailwindCSS', color: '#38BDF8' },
  { name: 'ProseMirror', color: '#FF6B35' },
  { name: 'TipTap', color: '#000000' },
  { name: 'GSAP', color: '#00D26A' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Figma', color: '#A259FF' },
  { name: 'MySQL', color: '#F29111' },
  { name: 'Python/Django', color: '#3776AB' },
  { name: 'Git & GitHub', color: '#F05032' },
  { name: 'UI Systems', color: '#E34F26' },
  { name: 'WebRTC', color: '#8CC84B' },
]

function SkillButton({ children, position, color }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef()

  return (
    <group position={position} ref={ref}>
      <Html 
        transform 
        sprite 
        distanceFactor={10} 
        zIndexRange={[100, 0]}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: 'rgba(5, 5, 5, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.2)'}`,
            color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
            padding: '8px 18px',
            borderRadius: '24px',
            fontFamily: '"DM Mono", monospace',
            fontSize: '10px',
            fontWeight: 'bold',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            boxShadow: hovered ? `0 0 20px ${color}50, inset 0 0 10px ${color}30` : '0 0 10px rgba(0,0,0,0.5)',
            textShadow: hovered ? `0 0 10px ${color}90` : 'none',
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
            pointerEvents: 'auto',
            whiteSpace: 'nowrap',
            willChange: 'transform, border-color'
          }}
        >
          {children}
        </div>
      </Html>
    </group>
  )
}

function Cloud({ radius = 3.5 }) {
  const group = useRef()
  
  // Rotate the entire cloud smoothly without flipping upside down
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15
      // Gentle wobble instead of continuous X rotation to avoid inversions
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
      group.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  const items = useMemo(() => {
    const temp = []
    const count = skillsData.length
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

      temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), skillsData[i].name, skillsData[i].color])
    }
    return temp
  }, [radius])

  return (
    <group ref={group}>
      {items.map(([pos, word, color], index) => (
        <SkillButton key={index} position={pos} color={color}>
          {word}
        </SkillButton>
      ))}
    </group>
  )
}

// Electric Border Shader Material
const ElectricMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color('#E8FF00') }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    // Simple noise wrapper
    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
    
    void main() {
      // Calculate fresnel for rim lighting effect
      float fresnel = pow(max(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 1.2); // reduced power = thicker edge
      
      // Electric noise lines
      vec2 uv = vUv * 18.0; // scale up noise
      float noise = hash(floor(uv + time * 5.0)); // incredibly fast dense noise
      
      // Combine effects
      float intensity = smoothstep(0.2, 0.8, noise) * fresnel;
      
      // Core glow
      vec3 finalColor = color * (intensity * 6.0 + fresnel * 1.5);
      
      gl_FragColor = vec4(finalColor, fresnel * 0.9 + intensity * 2.5);
    }
  `,
  transparent: true,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending
})

function CoreGlobe() {
  const meshGroup = useRef()
  const materialParams = useMemo(() => ElectricMaterial.clone(), [])
  
  useFrame((state) => {
    if (meshGroup.current) {
      // Rotate the entire globe group
      meshGroup.current.rotation.x = state.clock.elapsedTime * 0.1
      meshGroup.current.rotation.y = state.clock.elapsedTime * 0.4
      meshGroup.current.rotation.z = state.clock.elapsedTime * 0.05
      
      // Update the shader time uniform for the electric effect
      materialParams.uniforms.time.value = state.clock.elapsedTime * 2.0
    }
  })
  
  return (
    <group ref={meshGroup}>
      {/* Inner dark core */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      
      {/* Outer electric rim */}
      {/* Changed to an Icosahedron to provide geometric structure, making its physical rotation visible alongside the shader */}
      <mesh material={materialParams}>
        <icosahedronGeometry args={[2.0, 8]} />
      </mesh>
    </group>
  )
}

export function AboutThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 60 }}
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#E8FF00" />
        <pointLight position={[-3, -3, 2]} intensity={1} color="#FF3CAC" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <CoreGlobe />
          <Cloud radius={3.2} />
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
      </Suspense>
    </Canvas>
  )
}

// Contact particles
function ContactParticles() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 3 + Math.random() * 4
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.06
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#E8FF00" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export function ContactThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#E8FF00" />
      <ContactParticles />
    </Canvas>
  )
}
