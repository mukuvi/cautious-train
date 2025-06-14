import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

export default function ProjectCard3D({ project, position, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
    }
  });

  return (
    <group position={position}>
      <motion.mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <RoundedBox args={[2, 2.5, 0.2]} radius={0.1} smoothness={4}>
          <MeshDistortMaterial
            color={project.color}
            distort={hovered ? 0.3 : 0.1}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        <Text
          position={[0, 0.8, 0.11]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_bold.typeface.json"
        >
          {project.title}
        </Text>
        
        <Text
          position={[0, 0.4, 0.11]}
          fontSize={0.1}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.tagline}
        </Text>
        
        <Text
          position={[0, -0.2, 0.11]}
          fontSize={0.08}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
        >
          {project.description.substring(0, 100)}...
        </Text>
      </motion.mesh>
    </group>
  );
}