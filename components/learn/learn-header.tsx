"use client"

import { motion } from "framer-motion"
import Image from "next/image"; // Import Next.js Image component for optimized image loading

// Optional: Define a prop for size control if you want to reuse this component with different sizes.
// Default size is set to match text-6xl (about 6rem = 96px). You can pass a custom size like <LearnHeader mascotSize={120} />
interface LearnHeaderProps {
  mascotSize?: number; // Width and height in pixels; defaults to 96
}

export default function LearnHeader({ mascotSize = 400 }: LearnHeaderProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-200 via-mint-100 to-pink-100">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 text-center text-balance">
            Let's Learn How to Stay Safe Online!
          </h1>

        </motion.div>

        {/* Floating mascot illustration */}
        <motion.div
          className="mt-8 flex justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          {/* Replaced emoji with image; size controlled via prop */}
          <Image
            src="/fox/learn.png"
            alt="Fox mascot logo"
            width={mascotSize}
            height={mascotSize}
            className="object-contain" // Ensures the image scales nicely without distortion
          />
        </motion.div>
                  <p className="text-lg md:text-xl text-navy-700 text-center max-w-2xl mx-auto text-balance">
            Explore fun lessons about passwords, privacy, and protecting your digital world.
          </p>
      </div>
    </section>
  )
}