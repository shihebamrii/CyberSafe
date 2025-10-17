"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Confetti from "./confetti"

interface GameModalProps {
  game: {
    id: number
    title: string
    emoji: string
    description: string
  }
  onClose: () => void
}

export default function GameModal({ game, onClose }: GameModalProps) {
  const [gameState, setGameState] = useState<"playing" | "completed">("playing")
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleGameComplete = () => {
    const randomScore = Math.floor(Math.random() * 40) + 60 // 60-100
    setScore(randomScore)
    setGameState("completed")
    setShowConfetti(true)

    // Update completed games count
    const current = Number.parseInt(localStorage.getItem("completedGames") || "0")
    localStorage.setItem("completedGames", String(current + 1))

    // Auto-hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handlePlayAgain = () => {
    setGameState("playing")
    setScore(0)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {gameState === "playing" ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-7xl mb-4">{game.emoji}</div>
                <h2 className="text-3xl font-bold text-navy-blue mb-2">{game.title}</h2>
                <p className="text-gray-600">{game.description}</p>
              </div>

              {/* Game placeholder area */}
              <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-12 text-center min-h-64 flex flex-col items-center justify-center">
                <p className="text-gray-600 mb-6 text-lg">Game loading...</p>
                <div className="space-y-4 w-full">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGameComplete}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg text-lg"
              >
                Complete Game
              </Button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-7xl"
              >
                🎉
              </motion.div>

              <div>
                <h3 className="text-3xl font-bold text-navy-blue mb-2">Awesome Job!</h3>
                <p className="text-gray-600 mb-4">You completed {game.title}!</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-light-yellow to-yellow-100 rounded-2xl p-6"
              >
                <p className="text-gray-600 mb-2">Your Score</p>
                <p className="text-5xl font-bold text-navy-blue">{score}%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-mint-green to-green-200 rounded-2xl p-6"
              >
                <p className="text-2xl font-bold text-navy-blue">🏆 Badge Earned!</p>
                <p className="text-gray-700 mt-2">{game.title} Master</p>
              </motion.div>

              <div className="flex gap-4">
                <Button
                  onClick={handlePlayAgain}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg"
                >
                  Play Again
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-navy-blue font-bold py-3 rounded-lg"
                >
                  Back to Games
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Confetti */}
        {showConfetti && <Confetti />}
      </motion.div>
    </AnimatePresence>
  )
}
