"use client"

import Image from 'next/image';

export default function Mascot() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mascot Illustration */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 rounded-3xl opacity-30 animate-pulse-glow" />
              <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="relative w-full h-full ">
                  <Image 
                    src="/fox/hero2.png" 
                    alt="CyberFox" 
                    fill 
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Meet CyberFox
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              CyberFox is your friendly guide through the digital world! With years of experience protecting the
              internet, CyberFox is here to teach you the best practices for staying safe online.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h3 className="font-bold text-gray-800">Always Protected</h3>
                  <p className="text-gray-600">Learn how to keep your personal information safe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <h3 className="font-bold text-gray-800">Smart Passwords</h3>
                  <p className="text-gray-600">Create strong passwords that keep hackers out</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <h3 className="font-bold text-gray-800">Internet Wisdom</h3>
                  <p className="text-gray-600">Navigate the web safely and responsibly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}