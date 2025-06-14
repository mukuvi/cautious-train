import React from "react";
import { FaGithub, FaLinkedin, FaHandHoldingUsd } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Social Links */}
          <div className="flex space-x-6">
            {[
              { href: "https://github.com/mukuvi", icon: FaGithub, label: "GitHub" },
              { href: "https://twitter.com/Mukuvi_", icon: FaXTwitter, label: "Twitter" },
              { href: "https://www.linkedin.com/in/james-ngandu", icon: FaLinkedin, label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-white group-hover:text-blue-300 transition-colors duration-300" />
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {social.label}
                </div>
              </a>
            ))}
            
            <Link
              to="/support"
              className="group relative p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-110 animate-pulse-glow"
              aria-label="Support"
            >
              <FaHandHoldingUsd className="w-5 h-5 text-white" />
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Support
              </div>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} James Ngandu. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Built with ❤️ using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;