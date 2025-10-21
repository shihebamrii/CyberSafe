"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Confetti from "./confetti"

// Mini-games
import PasswordBuilderGame from "../mini-games/password-builder-game"
import PhishingDetectiveGame from "../mini-games/phishing-detective-game"
import ChatSmartGame from "../mini-games/chat-smart-game"

interface GameModalProps {
  game: {
    id: number
    title: string
    emoji: string
    description: string
  }
  onClose: () => void
}

// Map game IDs to components
const gameComponents: Record<number, any> = {
  1: PhishingDetectiveGame,
  2: PasswordBuilderGame,
  3: ChatSmartGame,}

export default function GameModal({ game, onClose }: GameModalProps) {
  const [gameState, setGameState] = useState<"playing" | "completed">("playing")
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleGameComplete = () => {
    const randomScore = Math.floor(Math.random() * 40) + 60
    setScore(randomScore)
    setGameState("completed")
    setShowConfetti(true)

    const current = Number.parseInt(localStorage.getItem("completedGames") || "0")
    localStorage.setItem("completedGames", String(current + 1))

    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handlePlayAgain = () => {
    setGameState("playing")
    setScore(0)
  }

  const GameComponent = gameComponents[game.id]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Header */}
          <div className="p-6 pb-3 text-center border-b border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {game.emoji} {game.title}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1">{game.description}</p>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center w-full">
            {gameState === "playing" ? (
              <div className="w-full flex flex-col items-center justify-center">
                {GameComponent ? (
                  <GameComponent onComplete={handleGameComplete} />
                ) : (
                  <p className="text-gray-500">Loading game...</p>
                )}
              </div>
            ) : (
              <div className="text-center space-y-6 w-full max-w-md mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-6xl"
                >
                  🎉
                </motion.div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Awesome Job!</h3>
                  <p className="text-gray-500 mt-1">You completed {game.title}!</p>
                </div>

                {/* Score Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-6"
                >
                  <p className="text-gray-600 mb-1">Your Score</p>
                  <p className="text-4xl sm:text-5xl font-bold text-gray-800">{score}%</p>
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-6"
                >
                  <p className="text-xl font-semibold text-gray-800">🏆 Badge Earned</p>
                  <p className="text-gray-700 mt-1">{game.title} Master</p>
                </motion.div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    onClick={handlePlayAgain}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl"
                  >
                    Play Again
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl"
                  >
                    Back to Games
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Confetti */}
          {showConfetti && <Confetti />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
