import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  Float,
  Text3D,
  Center,
  Stars,
  Html,
  useProgress
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import InteractiveBackground from '../components/3D/InteractiveBackground';
import { Link } from 'react-router-dom';

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl">
        Loading 3D Experience... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// 3D Hero Text
function HeroText3D() {
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[0, 1, 0]}
        >
          JAMES
          <meshStandardMaterial 
            color="#667eea" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#667eea"
            emissiveIntensity={0.2}
          />
        </Text3D>
        
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[0, -0.5, 0]}
        >
          SOFTWARE DEVELOPER
          <meshStandardMaterial 
            color="#764ba2" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#764ba2"
            emissiveIntensity={0.1}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

export default function Home3D() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />
      
      {/* 3D Canvas */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={<Loader />}>
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} color="#667eea" intensity={0.5} />
            <pointLight position={[10, -10, 5]} color="#764ba2" intensity={0.5} />
            
            {/* Environment */}
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Interactive Background */}
            <InteractiveBackground />
            
            {/* 3D Hero Text */}
            <HeroText3D />
            
            {/* Controls */}
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 2.2}
            />
            
            {/* Post-processing */}
            <EffectComposer>
              <Bloom intensity={0.3} luminanceThreshold={0.9} />
              <ChromaticAberration offset={[0.001, 0.001]} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8 px-4">
          {/* Animated subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Creating immersive digital experiences with cutting-edge 3D technology
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(102, 126, 234, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>Explore Projects</span>
                  <span className="text-lg">🚀</span>
                </span>
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("/jamesngandu.pdf")}
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <span>Download Resume</span>
                <span className="text-lg">📄</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="grid grid-cols-3 gap-8 pt-12 max-w-md mx-auto"
          >
            {[
              { number: "50+", label: "Projects" },
              { number: "3+", label: "Years" },
              { number: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}