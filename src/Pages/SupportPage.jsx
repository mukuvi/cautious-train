import { useState, useEffect } from "react";
import { paystackConfig } from "../../paystackConfig.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const SupportPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState(paystackConfig.email);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePay = () => {
    if (!amount || amount < 100 || !email) {
      return alert("Enter a valid amount (min KES 100) and email");
    }

    const handler = window.PaystackPop.setup({
      key: paystackConfig.publicKey,
      email,
      amount: amount * 100,
      currency: "KES",
      ref: "SUP-" + Date.now(),
      metadata: {
        custom_fields: [
          {
            display_name: "Message",
            variable_name: "message",
            value: message,
          },
        ],
      },
      callback: (response) => {
        alert("Payment complete! Ref: " + response.reference);
        setModalOpen(false);
      },
      onClose: () => alert("Payment window closed"),
    });

    handler.openIframe();
  };

  const supportOptions = [
    {
      icon: "fa-gift",
      title: "One-time Support",
      desc: "Support current projects with a one-time donation.",
      color: "blue",
      type: "one-time",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "fa-calendar-check",
      title: "Monthly Support",
      desc: "Sustain long-term work with monthly contributions.",
      color: "purple",
      type: "monthly",
      gradient: "from-purple-500 to-pink-500"
    },
  ];

  const whySupport = [
    {
      icon: "fa-lightbulb",
      title: "Fuel Innovation",
      desc: "Your support allows me to experiment with new ideas and technologies.",
      color: "green"
    },
    {
      icon: "fa-clock",
      title: "Time Investment",
      desc: "Creating quality projects takes hundreds of hours of work.",
      color: "yellow"
    },
    {
      icon: "fa-server",
      title: "Cover Costs",
      desc: "Hosting, domains, APIs, and tools all add up over time.",
      color: "red"
    },
    {
      icon: "fa-heart",
      title: "Show Appreciation",
      desc: "Your support motivates me to keep creating and sharing.",
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slideInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Support My Work
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your support helps me create more amazing projects and content. 
            Every contribution makes a difference in my journey as a developer.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <div 
              key={option.type}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-slideInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${option.gradient}`}></div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-2xl flex items-center justify-center shadow-lg mr-4`}>
                    <i className={`fas ${option.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{option.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{option.desc}</p>
                
                <button
                  onClick={() => {
                    setDonationType(option.type);
                    setModalOpen(true);
                  }}
                  className={`btn-3d w-full py-4 bg-gradient-to-r ${option.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {option.type === "monthly" ? "Subscribe Monthly" : "Donate Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Support Section */}
        <div className="mb-16 animate-slideInUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Support My Work?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whySupport.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  item.color === 'green' ? 'bg-green-100 text-green-600' :
                  item.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  item.color === 'red' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <i className={`fas ${item.icon} text-lg`}></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-slideInUp">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Support?</h3>
            <p className="text-orange-100 mb-8 text-lg max-w-2xl mx-auto">
              Thank you for considering supporting my work. Every contribution, 
              no matter the size, helps me continue creating and sharing valuable content.
            </p>
            <button
              onClick={() => {
                setDonationType("one-time");
                setModalOpen(true);
              }}
              className="btn-3d px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
            >
              Support Now
            </button>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-slideInUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {donationType === "monthly" ? "Start Monthly Support" : "Make a Donation"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
              >
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-4">
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[200, 500, 1000, 3000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-2 px-3 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    KES {quickAmount}
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Amount (KES)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300"
              />

              {donationType === "monthly" && (
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300">
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
              )}

              <textarea
                rows={3}
                placeholder="Optional Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-300 resize-none"
              />

              <button
                onClick={handlePay}
                className="btn-3d w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SupportPage;