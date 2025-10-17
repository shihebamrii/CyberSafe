"use client"

import { Button } from "@/components/ui/button"
import { Zap, Gamepad2 } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"


// Use consistent prop name: mascotSize for the hero fox image (controls both width and height)
interface HeroProps {
  mascotSize?: number; // Width and height in pixels; defaults to 450 to match original
}

export default function Hero({ mascotSize = 500 }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 left-10 text-4xl opacity-30"
        >
          🔒
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-32 right-10 text-4xl opacity-30"
        >
          🛡️
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-40 left-1/4 text-4xl opacity-30"
        >
          🔑
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-32 right-1/4 text-4xl opacity-30"
        >
          ⭐
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Let's Learn How to Stay Safe Online!
              </span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              CyberSafe Kids helps children discover cybersecurity through games, stories, and quizzes. Make learning
              fun and stay protected!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-8 py-6 text-lg font-semibold flex items-center gap-2 group">
                <Zap className="w-5 h-5 group-hover:animate-pulse" />
                Start Learning
              </Button>
              <Button className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg font-semibold flex items-center gap-2 group">
                <Gamepad2 className="w-5 h-5 group-hover:animate-pulse" />
                Play a Game
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Hero mascot image with size controlled via mascotSize prop */}
              <Image 
                src="/fox/hero.png"
                alt="Hero illustration"
                width={mascotSize}
                height={mascotSize}
                priority
              />
              {/* Optional: Blurred gradient background effect behind the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-3xl opacity-50 -z-10 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 