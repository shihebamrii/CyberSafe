"use client"

import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { BookOpen, Users, BarChart3 } from "lucide-react"

export default function Parents() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                For Parents & Guardians
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tips and guides to help you protect your child online. Stay informed about their digital journey and
              support their learning.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Parent Guides</h3>
                  <p className="text-gray-600">Comprehensive resources for keeping kids safe online</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Community Support</h3>
                  <p className="text-gray-600">Connect with other parents and share experiences</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Progress Tracking</h3>
                  <p className="text-gray-600">Monitor your child's learning and achievements</p>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full px-8 py-6 text-lg font-semibold">
              Explore Parent Resources
            </Button>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-3xl opacity-30" />
              <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image 
                    src="/fox/hero3.png" 
                    alt="Family Safety" 
                    fill 
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}