"use client"

import { motion } from "framer-motion"
import Image from "next/image"; // Import Next.js Image component for optimized image loading

// Optional: Define a prop for size control if you want to reuse this component with different sizes.
// Default size is set to match text-8xl (about 8rem = 128px). You can pass a custom size like <PlayHeader mascotSize={160} />
interface PlayHeaderProps {
  mascotSize?: number; // Width and height in pixels; defaults to 128
}

export default function PlayHeader({ mascotSize = 420 }: PlayHeaderProps) {
  return (
    <section className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-navy-blue mb-4">Ready to Play and Stay Safe?</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn cybersecurity security through fun challenges and mini-games!
        </p>

        {/* Mascot with floating animation */}
        <div className="flex justify-center mt-8">

            {/* Replaced emoji with image; size controlled via prop */}
            <Image
              src="/fox/play.png"
              alt="Fox mascot logo"
              width={mascotSize}
              height={mascotSize}
              className="object-contain" // Ensures the image scales nicely without distortion
            />
        </div>
        <p className="text-lg text-gray-600 font-medium">CyberFox is ready to play!</p>
      </motion.div>

      {/* Floating background icons */}
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
    </section>
  )
}