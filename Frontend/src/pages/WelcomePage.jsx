"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Users,
  Zap,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const [countdown, setCountdown] = useState(10);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show content with animation after component mounts
    setTimeout(() => setShowContent(true), 100);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Setup",
      description: "Your bio link is ready to use right now",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect Everything",
      description: "Link all your social profiles in one place",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Grow Your Audience",
      description: "Watch your engagement soar",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12">
          {/* Success Icon with Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Sparkle Effects */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <Sparkles
                className="w-6 h-6 text-yellow-400 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div className="absolute top-4 right-1/4">
              <Sparkles
                className="w-4 h-4 text-orange-400 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="absolute top-4 left-1/4">
              <Sparkles
                className="w-5 h-5 text-red-400 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
            </div>
          </div>

          {/* Welcome Content */}
          <div className="space-y-6 mb-10">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                🎉 Welcome to{" "}
                <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Willow
                </span>
                !
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Your account is all set up and ready to go! You're about to
                transform how you share your online presence.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 my-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 transform transition-all duration-500 hover:scale-105`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* What's Next */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                🚀 What's next?
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Add your first links</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Customize your page design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Share your unique link</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Track your analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown and Redirect Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 text-orange-600">
              <ArrowRight className="w-5 h-5 animate-pulse" />
              <span className="font-medium">
                Taking you to your dashboard...
              </span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {countdown}
                  </span>
                </div>
                <div className="absolute inset-0 border-4 border-orange-300 rounded-full animate-ping"></div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
            </p>
          </div>

          {/* Skip Button */}
          <div className="mt-8">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="text-orange-600 hover:text-orange-500 font-medium text-sm transition-colors duration-300 underline decoration-dotted underline-offset-4"
            >
              Skip and go to dashboard now
            </button>
          </div>
        </div>

        {/* Confetti Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-confetti`}
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#fbbf24", "#f97316", "#ef4444", "#10b981"][
                  Math.floor(Math.random() * 4)
                ],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-confetti {
          animation: confetti 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
