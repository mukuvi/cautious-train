import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slideInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Software Developer
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            I am James Mukuvi Ngandu, a passionate software developer who
            specializes in creating modern, responsive web applications. With a
            strong foundation in both frontend and backend technologies, I focus
            on building scalable, high-performance solutions.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - About Me */}
          <div className="space-y-8 animate-slideInLeft">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
                  👨‍💻
                </span>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">
                I strive to provide excellent user experiences while maintaining clean,
                efficient code. My expertise includes React, Next.js, TailwindCSS,
                MongoDB, Express.js and Node.js. I am committed to delivering
                impactful, user-centered results.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
                  🌟
                </span>
                Open Source
              </h2>
              <p className="text-gray-700 leading-relaxed">
                I am deeply interested in open-source development, regularly contributing 
                to open-source projects such as Hacktoberfest, where I collaborate with 
                others to help improve and grow the open-source ecosystem.
              </p>
            </div>
          </div>

          {/* Right Column - Journey */}
          <div className="space-y-6 animate-slideInRight">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center lg:text-left">
              My Development Journey
            </h2>

            {[
              {
                title: "Discovering Code",
                description: "My journey began with HTML and CSS, building simple websites and discovering the joy of creating something from nothing.",
                icon: "🚀",
                color: "from-orange-400 to-red-500"
              },
              {
                title: "Mastering JavaScript",
                description: "I focused on learning JavaScript deeply, understanding its quirks and powerful features to build interactive applications.",
                icon: "⚡",
                color: "from-yellow-400 to-orange-500"
              },
              {
                title: "Full Stack Development",
                description: "Today, I combine frontend and backend technologies to build complete, scalable solutions for complex problems.",
                icon: "🎯",
                color: "from-blue-500 to-purple-600"
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Preview */}
        <div className="mt-16 text-center animate-slideInUp">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to work together?</h3>
            <p className="text-blue-100 mb-6">
              Let's build something amazing together. I'm always excited to take on new challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-3d px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="/projects"
                className="btn-3d px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;