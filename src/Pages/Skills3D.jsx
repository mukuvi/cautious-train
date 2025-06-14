import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SkillSphere3D from '../components/3D/SkillSphere3D';
import InteractiveBackground from '../components/3D/InteractiveBackground';
import { frontendSkills, backendSkills } from '../data/skillsData';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl">
        Loading Skills... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default function Skills3D() {
  const allSkills = [...frontendSkills, ...backendSkills];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* 3D Canvas */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
          <Suspense fallback={<Loader />}>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#2ecc71" intensity={0.5} />
            <pointLight position={[10, -10, 5]} color="#3498db" intensity={0.5} />
            
            {/* Environment */}
            <Environment preset="night" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            
            {/* Interactive Background */}
            <InteractiveBackground count={2000} />
            
            {/* 3D Skill Spheres */}
            {allSkills.map((skill, index) => {
              const angle = (index / allSkills.length) * Math.PI * 2;
              const radius = 12;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const y = Math.sin(index * 0.5) * 3;
              
              return (
                <SkillSphere3D
                  key={skill.id}
                  skill={skill}
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
              autoRotateSpeed={0.3}
              minDistance={15}
              maxDistance={35}
            />
            
            {/* Post-processing */}
            <EffectComposer>
              <Bloom intensity={0.3} luminanceThreshold={0.9} />
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
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                3D Skills Universe
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Navigate through my technical skills in an immersive 3D space. Each sphere represents a technology I work with.
            </p>
          </motion.div>

          {/* Skills Categories */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Frontend Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Frontend</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎨</span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Creating beautiful, interactive user interfaces with modern frameworks and cutting-edge technologies.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {frontendSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`${skill.icon} text-xl`} style={{ color: skill.color }}></i>
                      <div>
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <p className="text-sm text-gray-400">{skill.proficiency}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Backend Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Backend</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⚙️</span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                Building robust, scalable server-side applications with modern databases and APIs.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {backendSkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-green-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`${skill.icon} text-xl`} style={{ color: skill.color }}></i>
                      <div>
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <p className="text-sm text-gray-400">{skill.proficiency}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing</h3>
              <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
                With these skills and technologies, I'm ready to tackle your next project and bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
                >
                  View My Projects
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Get In Touch
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