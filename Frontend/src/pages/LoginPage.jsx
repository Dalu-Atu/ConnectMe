import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function WillowLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-semibold text-blue-600">
                Willow
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Creators
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Blog
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                FAQ
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600">
              Log in
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Sign up FREE
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                The All-in-One Link in Bio
                <br />
                for Creators, Brands, & Influencers
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Drive Traffic from Instagram, Twitter or Facebook With Just One
                URL
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <Input
                  placeholder="Type your email..."
                  className="flex-1 h-12 px-4 border-gray-300"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8">
                  Get started for free
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative mx-auto w-64 h-96">
                <Image
                  src="/placeholder.svg?height=400&width=250"
                  alt="Willow app interface"
                  width={250}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-2 shadow-lg">
                  <span className="text-sm font-medium text-gray-600">
                    willo.link/yourname
                  </span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 grid grid-cols-2 gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">📷</span>
                </div>
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">🐦</span>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">▶</span>
                </div>
                <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">in</span>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">♪</span>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">♪</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Used by Top Creators */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Used by Top Creators ⭐
          </h2>
          <div className="flex justify-center items-center space-x-8 mt-12">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=200"
                alt="Paul Scheer profile"
                width={200}
                height={400}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute top-4 left-4 text-white">
                <p className="font-semibold">Paul Scheer</p>
                <p className="text-sm opacity-90">Actor & Comedian</p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=200"
                alt="Lushsux Ahgren profile"
                width={200}
                height={400}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute top-4 left-4 text-white">
                <p className="font-semibold">Lushsux Ahgren</p>
                <p className="text-sm opacity-90">Artist</p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=200"
                alt="Jesse James West profile"
                width={200}
                height={400}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute top-4 left-4 text-white">
                <p className="font-semibold">Jesse James West</p>
                <p className="text-sm opacity-90">Fitness Influencer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Users Love Us */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Our Users Love Us 💙
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Testimonial Cards */}
            {[
              {
                name: "Emma",
                handle: "@emma_creates",
                text: "Willow has been a game changer for my business! I can now easily share all my links in one place and track my analytics. Highly recommend!",
                verified: true,
              },
              {
                name: "Alex Johnson",
                handle: "@alexjohnson",
                text: "I've been using Willow for months and it's been a game changer for my brand. The analytics are incredible and the customization is top-notch.",
                verified: true,
              },
              {
                name: "Sarah M.",
                handle: "@sarahm_fitness",
                text: "Love how easy it is to set up and customize my links. The interface is clean and professional. Perfect for my fitness brand!",
                verified: true,
              },
              {
                name: "Mike Chen",
                handle: "@mikechenart",
                text: "As an artist, I need to showcase multiple platforms and Willow makes it so easy. The templates are beautiful and professional.",
                verified: true,
              },
              {
                name: "Jessica Rivera",
                handle: "@jessicarivera",
                text: "The analytics feature is amazing! I can see exactly where my traffic is coming from and optimize accordingly.",
                verified: true,
              },
              {
                name: "David Kim",
                handle: "@davidkim_tech",
                text: "Simple, clean, and effective. Willow has everything I need to manage my online presence in one place.",
                verified: true,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 border border-gray-200">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {testimonial.handle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-16">
            How it works 👋
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Add links illustration"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Add all your links
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Customize illustration"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Customize for your brand
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Share illustration"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Share it everywhere!
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free to use section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Willow is free to use for as long as you want 👍
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full mb-12">
            Start creating now
          </Button>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative">
                <Image
                  src={`/placeholder.svg?height=300&width=200`}
                  alt={`Template ${i}`}
                  width={200}
                  height={300}
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multiple links in one place */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Multiple links in one place
              </h2>
              <p className="text-gray-600 mb-8">
                Our bio link tool helps promote your online presence, connect
                with your audience, and turn your bio into a landing page for
                your most important links.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add your first link <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="p-4 bg-blue-500 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Twitter</p>
                      <p className="text-sm opacity-90">@username</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-red-500 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div>
                      <p className="font-semibold">YouTube</p>
                      <p className="text-sm opacity-90">Channel</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="space-y-4 mt-8">
                <Card className="p-4 bg-blue-700 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <p className="text-sm opacity-90">Profile</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-blue-400 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Facebook</p>
                      <p className="text-sm opacity-90">Page</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-pink-500 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Instagram</p>
                      <p className="text-sm opacity-90">@handle</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
