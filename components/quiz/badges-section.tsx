"use client"

import { motion } from "framer-motion"

interface BadgesSectionProps {
  completedLevels: number[]
  totalLevels: number
}

const badges = [
  { id: 1, name: "Password Master", icon: "🔐", color: "from-blue-400 to-blue-500" },
  { id: 2, name: "Privacy Guardian", icon: "🔒", color: "from-yellow-400 to-yellow-500" },
  { id: 3, name: "Phishing Detective", icon: "🎣", color: "from-pink-400 to-pink-500" },
  { id: 4, name: "Cyber Citizen", icon: "💬", color: "from-green-400 to-green-500" },
  { id: 5, name: "Device Defender", icon: "📱", color: "from-purple-400 to-purple-500" },
]

export default function BadgesSection({ completedLevels, totalLevels }: BadgesSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Badges</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {badges.map((badge, index) => {
          const isEarned = completedLevels.includes(badge.id)

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-4 text-center transition-all ${
                isEarned ? `bg-gradient-to-br ${badge.color} shadow-lg` : "bg-gray-100 opacity-50"
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className={`font-bold text-sm ${isEarned ? "text-white" : "text-gray-500"}`}>{badge.name}</p>
              {!isEarned && <p className="text-xs text-gray-400 mt-1">Locked</p>}
            </motion.div>
          )
        })}
      </div>

      {completedLevels.length === totalLevels && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-xl text-center"
        >
          <p className="text-lg font-bold text-yellow-800">
            Congratulations! You've earned all badges and mastered cybersecurity!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
