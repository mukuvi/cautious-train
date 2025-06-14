import React from "react";
import { FaFolderOpen, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project, index }) => {
  const { title, tagline, description, color, github } = project;

  return (
    <div 
      className="project-card-3d group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="project-card-inner relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
        {/* Gradient overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-1 opacity-80"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        ></div>
        
        {/* Card content */}
        <div className="p-6 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 
                className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300"
                style={{ color: color }}
              >
                • {title}
              </h3>
              <p className="text-gray-600 italic text-sm font-medium">
                {tagline}
              </p>
            </div>
            
            {/* Project icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
            >
              <FaFolderOpen className="w-5 h-5" />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6 text-sm">
            {description}
          </p>

          {/* Action button */}
          {github && (
            <div className="flex justify-end">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d inline-flex items-center px-4 py-2 rounded-lg font-medium text-white text-sm transition-all duration-300 hover:shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                }}
              >
                <span className="mr-2">View Project</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200 transition-colors duration-500"></div>
      </div>
    </div>
  );
};

export default ProjectCard;