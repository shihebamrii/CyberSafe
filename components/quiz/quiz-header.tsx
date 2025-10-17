"use client"

import { motion } from "framer-motion"
import Image from "next/image"; // Import Next.js Image component for optimized image loading

// Optional: Define a prop for size control if you want to reuse this component with different sizes.
// Default size is set to match text-6xl (about 6rem = 96px). You can pass a custom size like <QuizHeader mascotSize={120} />
interface QuizHeaderProps {
  mascotSize?: number; // Width and height in pixels; defaults to 96
}

export default function QuizHeader({ mascotSize = 310 }: QuizHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4"
    >
      <div className="flex justify-center mb-6">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {/* Replaced emoji with image; size controlled via prop */}
          <Image
            src="/fox/quiz.png"
            alt="Fox mascot logo"
            width={mascotSize}
            height={mascotSize}
            className="object-contain" // Ensures the image scales nicely without distortion
          />
        </motion.div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Test Your Cyber Skills!
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Complete each level and earn badges as you progress.
        journey!
      </p>
    </motion.div>
  )
}