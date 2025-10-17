"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function ProgressTracker() {
  const [completedGames, setCompletedGames] = useState(0)
  const totalGames = 5

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("completedGames")
    if (saved) setCompletedGames(Number.parseInt(saved))
  }, [])

  const progress = (completedGames / totalGames) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-sky-blue to-mint-green rounded-2xl p-8 mb-12 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-navy-blue">Your Progress</h2>
        <span className="text-3xl font-bold text-navy-blue">
          🎯 {completedGames}/{totalGames}
        </span>
      </div>
      <p className="text-navy-blue font-medium mb-4">
        You've completed {completedGames} of {totalGames} games!
      </p>

      {/* Progress bar */}
      <div className="w-full bg-white rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  )
}
