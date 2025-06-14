import React from "react";

const projects = [
  {
    name: "CafeSynca",
    url: "https://github.com/mukuvi/cafesynca",
    tech: ["ReactJS", "Node.js", "MongoDB", "Express"],
    desc: "creating a seamless online experience that mirrors the warmth and comfort of our café, one sip at a time.",
  },
  {
    name: "Ecosense-Ai",
    url: "https://github.com/mukuvi/Ecosense-Ai",
    tech: ["Javascript", "Node.js", "Gemini 2.0 Flash", "MongoDB"],
    desc: "mobile application designed to address urban waste pollution challenges in Kenyan cities.",
  },
  {
    name: "ARN.IO",
    url: "https://github.com/mukuvi/ARN.IO",
    tech: ["React Native", "Expo", "Firebase"],
    desc: "A learning app that help learners track their educational journey.",
  },
];

const skills = [
  "JavaScript",
  "TypeScript",
  "ReactJS",
  "NextJS",
  "React Native",
  "Node.js",
  "Python",
  "Bash Scripting",
  "Block Chain",
  "MongoDB",
  "Firebase",
];

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/mukuvi",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/james-ngandu",
  },
];

export default function Terminal() {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="terminal-window max-w-4xl mx-auto p-4">
        {/* Terminal Header */}
        <div className="terminal-header flex items-center justify-between p-4 mb-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-sm font-semibold tracking-wider">
            mukuvi@portfolio: ~
          </span>
          <div className="w-16"></div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-8">
          {/* About Section */}
          <div className="animate-slideInUp">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-green-400 font-bold">mukuvi@portfolio:~$</span>
              <span className="text-white">whoami</span>
            </div>
            <div className="ml-6 space-y-2 text-gray-300">
              {[
                "👋 Hi, I'm mukuvi, a passionate software developer.",
                "💻 Currently contributing to ReactJS and NextJS projects.",
                "🚀 Excited to be part of the React community!",
                "👯 Open to collaboration on web and mobile app development.",
                "🌱 Building cool native apps using React Native.",
                "💬 Love open source. Let's discuss collaboration and contribution!",
                "⚡ Fun fact: Music and coding in motion! 🎶💻 Harmonizing beats and algorithms."
              ].map((line, index) => (
                <div 
                  key={index}
                  className="animate-slideInLeft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="animate-slideInUp" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-green-400 font-bold">mukuvi@portfolio:~$</span>
              <span className="text-white">ls ./projects</span>
            </div>
            <div className="ml-6">
              <h3 className="text-orange-400 font-bold text-lg mb-4">Projects</h3>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div 
                    key={project.name}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
                    style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  >
                    <div className="mb-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-bold text-lg transition-colors duration-200"
                      >
                        {project.name}
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-700 text-cyan-300 text-xs rounded border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-green-300 text-sm">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="animate-slideInUp" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-green-400 font-bold">mukuvi@portfolio:~$</span>
              <span className="text-white">cat ./skills.txt</span>
            </div>
            <div className="ml-6">
              <h3 className="text-orange-400 font-bold text-lg mb-4">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700 text-cyan-300 text-sm rounded border border-gray-600 hover:border-cyan-400 transition-colors duration-200 animate-slideInUp"
                    style={{ animationDelay: `${1.3 + index * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="animate-slideInUp" style={{ animationDelay: '1.5s' }}>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-green-400 font-bold">mukuvi@portfolio:~$</span>
              <span className="text-white">echo "Contact & Links"</span>
            </div>
            <div className="ml-6">
              <h3 className="text-orange-400 font-bold text-lg mb-4">Find me online</h3>
              <div className="space-x-4">
                {socials.map((social, index) => (
                  <React.Fragment key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 underline"
                    >
                      {social.name}
                    </a>
                    {index < socials.length - 1 && (
                      <span className="text-gray-500">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="animate-slideInUp pt-8 border-t border-gray-700" style={{ animationDelay: '1.7s' }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-400 font-bold">mukuvi@portfolio:~$</span>
              <span className="text-white animate-pulse">█</span>
            </div>
            <div className="text-center text-gray-500 text-sm">
              <p>
                &copy; {new Date().getFullYear()} —{" "}
                <a
                  href="https://www.mukuvi.me"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  mukuvi
                </a>{" "}
                — all rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}