import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm{" "}
                  <span className="gradient-text">JAMES</span>
                </h1>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-600">
                  Software Developer
                </h2>
                
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-lg">
                  I build modern, responsive web applications that deliver exceptional user experiences.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/terminal">
                  <button className="btn-3d w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <span className="flex items-center justify-center space-x-2">
                      <span>Terminal</span>
                      <span className="text-lg">💻</span>
                    </span>
                  </button>
                </Link>
                
                <button
                  onClick={() => window.open("/jamesngandu.pdf")}
                  className="btn-3d w-full sm:w-auto px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Resume</span>
                    <span className="text-lg">📄</span>
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: "50+", label: "Projects" },
                  { number: "3+", label: "Years Experience" },
                  { number: "100%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 3D Cube */}
            <div className="flex justify-center lg:justify-end animate-slideInRight">
              <div className="cube-container animate-float">
                <div className="cube animate-rotate3d w-48 h-48 lg:w-56 lg:h-56">
                  {[
                    { face: "front", icon: "fab fa-react", color: "from-blue-400 to-blue-600" },
                    { face: "back", icon: "fab fa-node-js", color: "from-green-400 to-green-600" },
                    { face: "right", icon: "fab fa-js", color: "from-yellow-400 to-yellow-600" },
                    { face: "left", icon: "fab fa-html5", color: "from-orange-400 to-orange-600" },
                    { face: "top", icon: "fab fa-css3-alt", color: "from-blue-400 to-blue-600" },
                    { face: "bottom", icon: "fab fa-github", color: "from-gray-700 to-gray-900" },
                  ].map((item) => (
                    <div
                      key={item.face}
                      className={`cube-face ${item.face} bg-gradient-to-br ${item.color} text-white rounded-lg shadow-xl`}
                    >
                      <i className={item.icon}></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-16 lg:mt-24">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home;