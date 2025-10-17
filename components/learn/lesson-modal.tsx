"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LessonModalProps {
  lesson: {
    id: number
    title: string
    icon: string
    content: string
  }
  isCompleted: boolean
  onMarkDone: () => void
  onClose: () => void
}

export default function LessonModal({ lesson, isCompleted, onMarkDone, onClose }: LessonModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleMarkDone = () => {
    if (!isCompleted) {
      setShowConfetti(true)
      setTimeout(() => {
        onMarkDone()
      }, 1000)
    } else {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-300 via-mint-300 to-pink-300 p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-navy-900" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{lesson.icon}</div>
              <div>
                <h2 className="text-3xl font-bold text-navy-900">{lesson.title}</h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-lg text-navy-700 leading-relaxed mb-8">{lesson.content}</p>

            {/* Confetti animation on completion */}
            {showConfetti && (
              <motion.div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="text-6xl"
                >
                  🎉
                </motion.div>
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleMarkDone}
                className={`flex-1 py-6 text-lg font-semibold rounded-lg transition-all ${
                  isCompleted
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                }`}
              >
                {isCompleted ? "✓ Completed" : "Mark as Done"}
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 py-6 text-lg font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-navy-900"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
