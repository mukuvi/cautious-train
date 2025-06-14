import React from "react";

const SkillCard = ({ skill, index }) => {
  const { name, icon, proficiency, color } = skill;

  return (
    <div 
      className="skill-card-hover bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-slideInUp"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        borderTopColor: color 
      }}
    >
      {/* Header with icon and title */}
      <div 
        className="px-4 py-3 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
      >
        <div className="flex items-center justify-center space-x-2 relative z-10">
          <i className={`${icon} text-lg`}></i>
          <h3 className="font-semibold text-sm text-center">{name}</h3>
        </div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
      </div>

      {/* Proficiency section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Proficiency</span>
          <span className="text-xs font-bold text-gray-800">{proficiency}%</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{
              width: `${proficiency}%`,
              background: `linear-gradient(90deg, ${color}, ${color}88)`,
              animationDelay: `${index * 0.1 + 0.5}s`
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;