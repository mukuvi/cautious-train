import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="text-center animate-slideInUp">
        <div className="mb-8">
          {/* 404 Animation */}
          <div className="relative">
            <h1 className="text-8xl sm:text-9xl font-bold gradient-text mb-4 animate-float">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-4 border-blue-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto border border-gray-100">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into the digital void.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="btn-3d block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Go Back Home</span>
              </span>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/projects"
                className="btn-3d py-2 px-4 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-sm"
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="btn-3d py-2 px-4 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>💡 Fun fact: HTTP 404 errors were named after room 404 at CERN where the web was born!</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;