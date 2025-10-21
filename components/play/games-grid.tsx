"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import GameCard from "./game-card"
import GameModal from "./game-modal"

const games = [
  {
    id: 1,
    title: "Spot the Phish",
    emoji: "🕵️",
    description: "Can you tell which message is fake? Detect phishing scams!",
    color: "from-sky-blue to-blue-300",
  },
  {
    id: 2,
    title: "Password Builder",
    emoji: "🔐",
    description: "Create a strong password by combining the safest options.",
    color: "from-light-yellow to-yellow-200",
  },
  {
    id: 3,
    title: "Chat Smart",
    emoji: "💬",
    description: "Decide what's safe to share and what's private. In online chats.",
    color: "from-soft-pink to-pink-300",
  },

]

export default function GamesGrid() {
  const [selectedGame, setSelectedGame] = useState<(typeof games)[0] | null>(null)

  return (
    <>
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center">Choose Your Game</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GameCard game={game} onPlay={() => setSelectedGame(game)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Game Modal */}
      {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </>
  )
}
