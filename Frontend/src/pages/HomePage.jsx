import {
  CheckCircle,
  Menu,
  X,
  Star,
  Users,
  Zap,
  Shield,
  BarChart3,
  Palette,
} from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Setup",
      description:
        "Get your bio link ready in under 60 seconds with our intuitive drag-and-drop builder.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description:
        "Track clicks, views, and engagement with detailed analytics and insights.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Full Customization",
      description:
        "Match your brand with custom themes, colors, fonts, and layouts.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description:
        "99.9% uptime guarantee with enterprise-grade security and SSL encryption.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Work with your team to manage multiple bio links and campaigns.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Templates",
      description:
        "Choose from 50+ professionally designed templates for every industry.",
    },
  ];

  const testimonials = [
    {
      name: "Emma Rodriguez",
      handle: "@emma_creates",
      role: "Content Creator",
      text: "Willow transformed my Instagram bio into a conversion machine. I've seen a 300% increase in website traffic since switching!",
      verified: true,
      rating: 5,
      followers: "125K",
    },
    {
      name: "Alex Johnson",
      handle: "@alexjohnson",
      role: "Digital Marketer",
      text: "The analytics are incredible! I can see exactly which links perform best and optimize my strategy accordingly.",
      verified: true,
      rating: 5,
      followers: "89K",
    },
    {
      name: "Sarah Mitchell",
      handle: "@sarahm_fitness",
      role: "Fitness Influencer",
      text: "Clean, professional, and so easy to use. My audience loves how organized my links are now.",
      verified: true,
      rating: 5,
      followers: "234K",
    },
    {
      name: "Mike Chen",
      handle: "@mikechenart",
      role: "Digital Artist",
      text: "As an artist, presentation is everything. Willow helps me showcase my work beautifully across all platforms.",
      verified: true,
      rating: 5,
      followers: "156K",
    },
    {
      name: "Jessica Rivera",
      handle: "@jessicarivera",
      role: "Entrepreneur",
      text: "The team features are amazing! Managing multiple brand accounts has never been easier.",
      verified: true,
      rating: 5,
      followers: "78K",
    },
    {
      name: "David Kim",
      handle: "@davidkim_tech",
      role: "Tech Reviewer",
      text: "Simple, powerful, and reliable. Everything I need to manage my online presence in one place.",
      verified: true,
      rating: 5,
      followers: "312K",
    },
  ];

  const socialPlatforms = [
    {
      name: "Instagram",
      color: "from-purple-500 to-pink-500",
      icon: "📷",
      users: "2B+",
    },
    {
      name: "YouTube",
      color: "from-red-500 to-red-600",
      icon: "▶️",
      users: "2.7B+",
    },
    {
      name: "TikTok",
      color: "from-gray-800 to-black",
      icon: "🎵",
      users: "1B+",
    },
    {
      name: "Twitter",
      color: "from-blue-400 to-blue-500",
      icon: "🐦",
      users: "450M+",
    },
    {
      name: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      icon: "💼",
      users: "900M+",
    },
    {
      name: "Facebook",
      color: "from-blue-500 to-blue-600",
      icon: "👥",
      users: "3B+",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-4 py-4">
          <div className="flex items-center space-x-8">
            <Logo />

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Features", href: "#features" },
                { name: "Templates", href: "#templates" },
                { name: "Pricing", href: "#pricing" },
                { name: "Blog", href: "#blog" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-orange-500 transition-all duration-300 relative group font-medium"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={"/signin"}
              className="text-gray-600 hover:text-orange-500 px-4 py-2 transition-colors duration-300 font-medium"
            >
              Sign In
            </Link>
            <Link
              to={"/signin"}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:from-yellow-500 hover:via-orange-500 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="p-6 space-y-4">
            {["Features", "Templates", "Pricing", "Blog"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-3 text-gray-600 hover:text-orange-500 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                to={"/sign-in"}
                className="block w-full text-left py-3 text-gray-600 font-medium"
              >
                Sign In
              </Link>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-2xl font-semibold">
                <Link to={"/sign-in"}>Start Free Trial</Link>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 lg:px-8 pt-24 pb-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-2xl blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-2xl blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>Trusted by 100K+ creators</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  The Ultimate{" "}
                  <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Link in Bio
                  </span>
                  <br />
                  Tool for Creators
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Transform your social media bio into a powerful landing page
                  that drives traffic, increases engagement, and grows your
                  business with just one link.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="flex-1 min-h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-700 bg-white shadow-sm"
                />
                <button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:from-yellow-500 hover:via-orange-500 hover:to-red-600 text-white h-14 px-8 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                  <Link to={"/sign-in"}>Get Started Free</Link>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Setup in 60 seconds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="relative mx-auto w-80 h-[600px] transform hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] shadow-2xl p-4">
                    <div className="w-full h-full bg-white rounded-[2.5rem] p-6 flex flex-col overflow-hidden">
                      {/* Profile Header */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-2xl">
                            W
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          @yourname
                        </h3>
                        <p className="text-gray-500">
                          Content Creator & Influencer
                        </p>
                        <p className="text-sm text-orange-600 font-medium">
                          125K followers
                        </p>
                      </div>

                      {/* Links */}
                      <div className="space-y-4 flex-1">
                        {[
                          {
                            name: "Latest YouTube Video",
                            color: "from-red-500 to-red-600",
                            icon: "▶️",
                          },
                          {
                            name: "Instagram Stories",
                            color: "from-purple-400 to-pink-400",
                            icon: "📷",
                          },
                          {
                            name: "New Blog Post",
                            color: "from-blue-500 to-blue-600",
                            icon: "📝",
                          },
                          {
                            name: "Shop My Favorites",
                            color: "from-green-500 to-green-600",
                            icon: "🛍️",
                          },
                          {
                            name: "Book a Call",
                            color: "from-orange-400 to-yellow-500",
                            icon: "📞",
                          },
                        ].map((link, i) => (
                          <div
                            key={link.name}
                            className={`bg-gradient-to-r ${link.color} text-white p-4 rounded-2xl flex items-center space-x-3 transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg`}
                          >
                            <span className="text-xl">{link.icon}</span>
                            <span className="font-medium">{link.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating URL */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-6 py-3 shadow-xl border-2 border-orange-100">
                  <span className="text-sm font-semibold text-gray-700">
                    willo.link/yourname
                  </span>
                </div>

                {/* Floating Social Icons */}
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden xl:grid grid-cols-2 gap-3">
                  {[
                    { bg: "bg-blue-600", icon: "f", name: "Facebook" },
                    {
                      bg: "bg-gradient-to-br from-purple-600 to-pink-600",
                      icon: "📷",
                      name: "Instagram",
                    },
                    { bg: "bg-blue-400", icon: "🐦", name: "Twitter" },
                    { bg: "bg-red-600", icon: "▶", name: "YouTube" },
                    { bg: "bg-blue-700", icon: "in", name: "LinkedIn" },
                    { bg: "bg-black", icon: "♪", name: "TikTok" },
                  ].map((social, i) => (
                    <div
                      key={social.name}
                      className={`w-12 h-12 ${social.bg} rounded-xl flex items-center justify-center text-white font-bold cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg group relative`}
                      title={social.name}
                    >
                      {social.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Social Proof */}
      <section className="px-4 lg:px-8 py-20 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Connect all your platforms
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Seamlessly integrate with all major social media platforms
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {socialPlatforms.map((platform, i) => (
              <div
                key={platform.name}
                className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {platform.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {platform.name}
                </h3>
                <p className="text-sm text-gray-500">{platform.users} users</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help creators, brands, and
              businesses maximize their online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-orange-200"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by creators worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our community is saying about Willow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-orange-200"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {testimonial.handle}
                    </p>
                    <p className="text-xs text-orange-600 font-medium">
                      {testimonial.followers} followers
                    </p>
                  </div>
                </div>

                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {testimonial.text}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {testimonial.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 lg:px-8 py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get started in 3 simple steps
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Create your professional bio link in minutes, not hours
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Sign up & add links",
                description:
                  "Create your account and add all your important links, social profiles, and content in one place.",
                color: "from-blue-400 to-blue-600",
                icon: "🔗",
              },
              {
                step: "02",
                title: "Customize your page",
                description:
                  "Choose from beautiful templates and customize colors, fonts, and layouts to match your brand perfectly.",
                color: "from-orange-400 to-orange-600",
                icon: "🎨",
              },
              {
                step: "03",
                title: "Share & grow",
                description:
                  "Use your unique Willow link everywhere and watch your engagement and traffic grow exponentially.",
                color: "from-purple-400 to-purple-600",
                icon: "🚀",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="text-center group transform transition-all duration-500 hover:scale-105"
              >
                <div className="relative mb-8">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-2xl flex items-center justify-center shadow-lg border-2 border-gray-100">
                    <span className="text-xs font-bold text-gray-600">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 lg:px-8 py-20 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform your bio?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join over 100,000 creators who are already growing their audience
            and business with Willow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 h-14 px-6 rounded-2xl text-gray-700 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
            />
            <button className="bg-white text-orange-500 px-8 py-4  text-lg font-semibold transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
              Start Free Trial
            </button>
          </div>
          <p className="text-sm opacity-75">
            No credit card required • Free forever plan available • Cancel
            anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 lg:px-8 py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="text-2xl font-bold">Willow</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The ultimate link in bio tool for creators, brands, and
                businesses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Willow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>🐦
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>📷
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>💼
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
