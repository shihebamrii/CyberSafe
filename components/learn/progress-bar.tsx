"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  completed: number
  total: number
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = (completed / total) * 100

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-semibold text-navy-900">
            🌟 You've completed {completed} of {total} lessons!
          </p>
          <span className="text-sm font-medium text-navy-700">{Math.round(percentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-mint-400 to-pink-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  )
}
