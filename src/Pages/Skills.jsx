import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SkillCard from "../Components/SkillCard";
import { frontendSkills, backendSkills } from "../data/skillsData";

function Skills() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slideInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Top Skills
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Frontend Skills */}
          <div className="animate-slideInLeft">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-500">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Frontend</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                I build dynamic SPAs with React, semantic code for better SEO and
                modern tech like Next.js, TailwindCSS and ES6+ for efficient,
                scalable applications.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {frontendSkills.map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Backend Skills */}
          <div className="animate-slideInRight">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-500">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Backend</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v3a2 2 0 01-2 2H5a2 2 0 01-2-2V9a1 1 0 00-1 1v5.5a1.5 1.5 0 01-3 0V9a2 2 0 012-2h1V6a2 2 0 012-2h8a2 2 0 012 2v1z" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                I develop scalable and maintainable backend systems with MongoDB,
                Express.js and Node.js for robust server-side applications.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {backendSkills.map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-slideInUp">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing</h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              With these skills and technologies, I'm ready to tackle your next project. 
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="btn-3d px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                View My Projects
              </a>
              <a
                href="/contact"
                className="btn-3d px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Skills;