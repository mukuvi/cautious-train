import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MyImage from "/mukuvi.jpeg";
import { Link } from "react-router-dom";
import { FaHandHoldingUsd, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slideInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-6">
            Get In Touch
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas or 
            opportunities to be part of your vision. Let's create something amazing together.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Contact Info */}
          <div className="animate-slideInLeft">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">Let's Talk</h2>
              <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                Feel free to reach out if you're looking for a developer, have a 
                question or just want to connect. I'd love to hear from you!
              </p>

              {/* Profile Image */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img 
                    src={MyImage} 
                    alt="James Ngandu" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
                </div>
                <h3 className="text-xl font-semibold mt-4">James Ngandu</h3>
                <p className="text-blue-200">Full Stack Developer</p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {[
                  {
                    icon: FaEnvelope,
                    title: "Email",
                    value: "jamesmngandu@gmail.com",
                    href: "mailto:jamesmngandu@gmail.com"
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: "Location",
                    value: "Nairobi, Kenya",
                    href: null
                  },
                  {
                    icon: FaPhone,
                    title: "Phone",
                    value: "+254 700 000 000",
                    href: "tel:+254700000000"
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <contact.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{contact.title}</h4>
                      {contact.href ? (
                        <a 
                          href={contact.href}
                          className="text-blue-200 hover:text-white transition-colors duration-200"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-blue-200">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Support Link */}
                <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
                    <FaHandHoldingUsd className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Support My Work</h4>
                    <Link 
                      to="/support"
                      className="text-orange-200 hover:text-white transition-colors duration-200 font-medium"
                    >
                      Buy me a coffee ☕
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="animate-slideInRight">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Send Me a Message</h2>
              
              <form
                action="https://formsubmit.co/82247b2786a024d98db380267c4f2c24"
                method="POST"
                className="space-y-6"
              >
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="james@example.com"
                    className="form-input w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-800"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                    className="form-input w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-800"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    placeholder="Hello James, I'd like to discuss..."
                    className="form-input w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-800 resize-none"
                  ></textarea>
                </div>

                {/* Hidden Fields */}
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_autoresponse"
                  value="Thanks for contacting me! I'll get back to you shortly."
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-3d w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center animate-slideInUp">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Response Time</h3>
            <p className="text-gray-600 mb-6">
              I typically respond to all inquiries within 24 hours. For urgent matters, 
              feel free to reach out via phone or email directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Available for new projects</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Open to collaborations</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}