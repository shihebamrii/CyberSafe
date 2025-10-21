"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GameCardProps {
  game: {
    id: number
    title: string
    emoji: string
    description: string
    color: string
  }
  onPlay: () => void
}

export default function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 shadow-lg cursor-pointer transition-all`}
    >
      <div className="text-6xl mb-4">{game.emoji}</div>
      <h3 className="text-2xl font-bold text-navy-blue mb-2">{game.title}</h3>
      <p className="text-gray-700 mb-6 text-sm">{game.description}</p>
      <Button
        onClick={onPlay}
        className="w-full bg-blue-500  hover:bg-blue-900 text-white font-bold py-2 rounded-lg transition-all"
      >
        Play Now
      </Button>
    </motion.div>
  )
}
