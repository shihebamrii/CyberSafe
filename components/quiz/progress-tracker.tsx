"use client"

import { motion } from "framer-motion"

interface ProgressTrackerProps {
  completed: number
  total: number
}

export default function ProgressTracker({ completed, total }: ProgressTrackerProps) {
  const percentage = (completed / total) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Your Progress</h3>
        <span className="text-2xl font-bold text-blue-600">
          {completed}/{total}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
        />
      </div>

      <p className="text-sm text-gray-600 mt-3">
        {completed === total
          ? "🎉 You've completed all levels!"
          : `${total - completed} level${total - completed !== 1 ? "s" : ""} remaining`}
      </p>
    </motion.div>
  )
}
