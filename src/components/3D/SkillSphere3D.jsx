import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

export default function SkillSphere3D({ skill, position, index }) {
  const meshRef = useRef();
  const textRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.3;
    }
    
    if (textRef.current) {
      textRef.current.lookAt(0, 0, 10);
    }
  });

  return (
    <group position={position}>
      <motion.mesh
        ref={meshRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color={skill.color}
            distort={0.2}
            speed={1}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        <Text
          ref={textRef}
          position={[0, 0, 0.9]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/helvetiker_bold.typeface.json"
        >
          {skill.name}
        </Text>
        
        <Text
          position={[0, -0.3, 0.9]}
          fontSize={0.1}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
        >
          {skill.proficiency}%
        </Text>
      </motion.mesh>
    </group>
  );
}