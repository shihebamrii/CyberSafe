"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Confetti() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
    }))
    setConfetti(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -10, opacity: 1 }}
          animate={{ y: window.innerHeight + 10, opacity: 0 }}
          transition={{ duration: 2.5, delay: piece.delay, ease: "easeIn" }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            background: ["#7DD3FC", "#FEF9C3", "#A7F3D0", "#FBCFE8"][Math.floor(Math.random() * 4)],
          }}
        />
      ))}
    </div>
  )
}
