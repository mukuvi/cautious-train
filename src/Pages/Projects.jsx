import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProjectCard from "../Components/ProjectCard";
import projectsData from "../data/projectsData";

function Projects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slideInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            My Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and passion projects that demonstrate my skills 
            in modern web development and creative problem-solving.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: projectsData.length, label: "Projects", icon: "🚀" },
            { number: "10+", label: "Technologies", icon: "⚡" },
            { number: "100%", label: "Open Source", icon: "🌟" },
            { number: "24/7", label: "Availability", icon: "💻" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-slideInUp">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Have a Project in Mind?</h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              I'm always excited to work on new and challenging projects. 
              Let's discuss how we can bring your vision to life with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-3d px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                Start a Project
              </a>
              <a
                href="https://github.com/mukuvi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Projects;