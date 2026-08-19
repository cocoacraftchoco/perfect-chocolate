import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshReflectorMaterial, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Artisanal Chocolate Bar Mesh
function ChocolateBar({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating and mouse tilt effect
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(t * 0.5) * 0.15 + (state.pointer.x * 0.3),
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.2 + Math.cos(t * 0.4) * 0.08 - (state.pointer.y * 0.2),
        0.05
      );
    }
  });

  // Create chocolate squares grid (4x2 grid of chocolate blocks)
  const rows = 4;
  const cols = 2;
  const squareWidth = 0.65;
  const squareHeight = 0.65;
  const gap = 0.06;

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Base Chocolate Slab */}
      <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[cols * (squareWidth + gap) + 0.1, rows * (squareHeight + gap) + 0.1, 0.18]} />
        <meshPhysicalMaterial 
          color="#361B12" 
          roughness={0.25} 
          metalness={0.08}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          reflectivity={0.9}
        />
      </mesh>

      {/* Raised Beveled Chocolate Squares */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const x = (c - (cols - 1) / 2) * (squareWidth + gap);
          const y = (r - (rows - 1) / 2) * (squareHeight + gap);
          const isGoldSquare = (r === 3 && c === 1); // Top right square has gold leaf detail!
          
          return (
            <group key={`${r}-${c}`} position={[x, y, 0.08]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[squareWidth, squareHeight, 0.12]} />
                <meshPhysicalMaterial
                  color={isGoldSquare ? "#D4AF37" : "#422116"}
                  roughness={isGoldSquare ? 0.15 : 0.2}
                  metalness={isGoldSquare ? 0.9 : 0.05}
                  clearcoat={isGoldSquare ? 1.0 : 0.7}
                  clearcoatRoughness={0.1}
                />
              </mesh>
              {/* Embossed Cocoa Leaf Logo on central square */}
              {r === 1 && c === 0 && (
                <mesh position={[0, 0, 0.07]}>
                  <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
                  <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
                </mesh>
              )}
            </group>
          );
        })
      )}

      {/* Gold Foil Wrapping Detail at bottom */}
      <mesh position={[0, -1.3, -0.02]} rotation={[-0.1, 0, 0.05]} castShadow>
        <boxGeometry args={[cols * (squareWidth + gap) + 0.2, 0.8, 0.22]} />
        <meshStandardMaterial 
          color="#E6C875" 
          metalness={0.92} 
          roughness={0.18}
          bumpScale={0.05}
        />
      </mesh>
    </group>
  );
}

// 3D Floating Cocoa Beans Component
function FloatingCocoaBeans() {
  const beansGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (beansGroup.current) {
      beansGroup.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  const beanPositions: [number, number, number, number][] = [
    [-2.2, 1.2, -0.5, 0.8],
    [2.3, 0.8, 0.4, 0.7],
    [-2.0, -1.2, 0.6, 0.9],
    [2.1, -1.5, -0.4, 0.6],
    [0.2, 2.1, -1.0, 0.75],
  ];

  return (
    <group ref={beansGroup}>
      {beanPositions.map((pos, i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={1.5} floatIntensity={2}>
          <mesh position={[pos[0], pos[1], pos[2]]} scale={pos[3]} castShadow>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#5A2D20" : "#3D1D13"} 
              roughness={0.7} 
              metalness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Gold Dust & Particle Effect Field
function GoldParticles() {
  const count = 40;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldColor = new THREE.Color("#D4AF37");
    const creamColor = new THREE.Color("#FFF1C5");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const c = Math.random() > 0.4 ? goldColor : creamColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Canvas Scene Container
export default function ChocolateScene({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-[480px] sm:h-[560px] lg:h-[640px] relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Warm Studio Lights for Rich Chocolate Highlights */}
        <ambientLight intensity={0.9} color="#FFF5EB" />
        <directionalLight position={[5, 6, 5]} intensity={2.2} color="#FFF8DC" castShadow />
        <directionalLight position={[-4, -2, -2]} intensity={1.1} color="#D4AF37" />
        <pointLight position={[0, 2, 2]} intensity={1.5} color="#FFD700" distance={6} />

        <PresentationControls
          global={false}
          cursor={true}
          speed={1.5}
          zoom={0.9}
          polar={[-0.2, 0.3]}
          azimuth={[-0.4, 0.4]}
        >
          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <ChocolateBar isHovered={isHovered} />
          </Float>
        </PresentationControls>

        <FloatingCocoaBeans />
        <GoldParticles />

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.65}
          scale={7}
          blur={2.5}
          far={4}
          color="#150703"
        />
      </Canvas>
      
      {/* Decorative Interactive Hint Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cocoa-900/80 border border-gold-500/30 text-gold-300 text-xs font-barlow tracking-wider backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
          Drag to inspect 3D Artisanal Bar
        </span>
      </div>
    </div>
  );
}
