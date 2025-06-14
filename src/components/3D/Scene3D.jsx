import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  Float,
  Text3D,
  Center,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  Stars,
  useTexture
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Floating geometric shapes
function FloatingGeometry({ position, geometry, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
        {geometry === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
        {geometry === 'torus' && <torusGeometry args={[0.6, 0.2, 16, 100]} />}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Animated 3D Text
function AnimatedText({ text, position, color = "#ffffff" }) {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <Center position={position}>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </Float>
  );
}

// Particle System
function ParticleField() {
  const points = useRef();
  const particleCount = 1000;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  );
}

// Main 3D Scene Component
export default function Scene3D({ section = "home" }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#ff6b6b" intensity={0.5} />
          <pointLight position={[10, -10, 5]} color="#4ecdc4" intensity={0.5} />
          
          {/* Environment */}
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Particle Field */}
          <ParticleField />
          
          {/* Section-specific content */}
          {section === "home" && (
            <>
              <AnimatedText text="JAMES" position={[0, 2, 0]} color="#667eea" />
              <AnimatedText text="DEVELOPER" position={[0, 0.5, 0]} color="#764ba2" />
              
              <FloatingGeometry position={[-4, 1, -2]} geometry="sphere" color="#ff6b6b" speed={1.2} />
              <FloatingGeometry position={[4, -1, -1]} geometry="box" color="#4ecdc4" speed={0.8} />
              <FloatingGeometry position={[0, -3, -3]} geometry="torus" color="#45b7d1" speed={1.5} />
            </>
          )}
          
          {section === "about" && (
            <>
              <FloatingGeometry position={[-3, 2, -2]} geometry="sphere" color="#f39c12" speed={1} />
              <FloatingGeometry position={[3, 0, -1]} geometry="box" color="#e74c3c" speed={1.3} />
              <FloatingGeometry position={[0, -2, -2]} geometry="torus" color="#9b59b6" speed={0.9} />
            </>
          )}
          
          {section === "skills" && (
            <>
              <FloatingGeometry position={[-2, 3, -1]} geometry="box" color="#2ecc71" speed={1.1} />
              <FloatingGeometry position={[2, 1, -2]} geometry="sphere" color="#3498db" speed={1.4} />
              <FloatingGeometry position={[0, -1, -3]} geometry="torus" color="#e67e22" speed={0.7} />
            </>
          )}
          
          {section === "projects" && (
            <>
              <FloatingGeometry position={[-3, 1, -1]} geometry="torus" color="#1abc9c" speed={1.2} />
              <FloatingGeometry position={[3, -1, -2]} geometry="sphere" color="#f1c40f" speed={0.9} />
              <FloatingGeometry position={[0, 2, -3]} geometry="box" color="#e91e63" speed={1.6} />
            </>
          )}
          
          {section === "contact" && (
            <>
              <FloatingGeometry position={[-2, 0, -1]} geometry="sphere" color="#ff9800" speed={1} />
              <FloatingGeometry position={[2, 2, -2]} geometry="torus" color="#673ab7" speed={1.3} />
              <FloatingGeometry position={[0, -2, -3]} geometry="box" color="#009688" speed={0.8} />
            </>
          )}
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={0.9} />
            <ChromaticAberration offset={[0.002, 0.002]} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}