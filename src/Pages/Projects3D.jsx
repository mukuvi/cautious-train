import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProjectCard3D from '../components/3D/ProjectCard3D';
import InteractiveBackground from '../components/3D/InteractiveBackground';
import projectsData from '../data/projectsData';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl">
        Loading Projects... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default function Projects3D() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* 3D Canvas */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Suspense fallback={<Loader />}>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#1abc9c" intensity={0.5} />
            <pointLight position={[10, -10, 5]} color="#e91e63" intensity={0.5} />
            
            {/* Environment */}
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            
            {/* Interactive Background */}
            <InteractiveBackground count={3000} />
            
            {/* 3D Project Cards */}
            {projectsData.slice(0, 6).map((project, index) => {
              const angle = (index / 6) * Math.PI * 2;
              const radius = 8;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const y = (index % 2) * 2 - 1;
              
              return (
                <ProjectCard3D
                  key={project.id}
                  project={project}
                  position={[x, y, z]}
                  index={index}
                />
              );
            })}
            
            {/* Controls */}
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              minDistance={10}
              maxDistance={25}
            />
            
            {/* Post-processing */}
            <EffectComposer>
              <Bloom intensity={0.4} luminanceThreshold={0.9} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <main className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                3D Projects Gallery
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore my projects in an immersive 3D environment. Use your mouse to rotate and zoom around the project cards.
            </p>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center mb-12"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">How to Navigate</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-pink-400">🖱️</span>
                  <span>Drag to rotate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyan-400">🔍</span>
                  <span>Scroll to zoom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✨</span>
                  <span>Hover to interact</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project List for Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="md:hidden space-y-6"
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: project.color }}>
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{project.tagline}</p>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    View Project
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Collaborate?</h3>
              <p className="text-cyan-100 mb-8 text-lg max-w-2xl mx-auto">
                Let's bring your ideas to life with cutting-edge 3D technology and modern web development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
                >
                  Start a Project
                </motion.a>
                <motion.a
                  href="https://github.com/mukuvi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  View GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}