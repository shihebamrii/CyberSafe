"use client"

import { motion } from "framer-motion"
import { Lock, Star } from "lucide-react"

interface Level {
  id: number
  title: string
  description: string
  color: string
  icon: string
}

interface LevelMapProps {
  levels: Level[]
  completedLevels: number[]
  selectedLevel: number | null
  onSelectLevel: (levelId: number) => void
  isLevelUnlocked: (levelId: number) => boolean
}

export default function LevelMap({
  levels,
  completedLevels,
  selectedLevel,
  onSelectLevel,
  isLevelUnlocked,
}: LevelMapProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">Cyber Quest Map</h2>

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Vertical connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-yellow-400 transform -translate-x-1/2" />

        <div className="space-y-8 relative z-10">
          {levels.map((level, index) => {
            const isUnlocked = isLevelUnlocked(level.id)
            const isCompleted = completedLevels.includes(level.id)
            const isAlternate = index % 2 === 1

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: isAlternate ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                className={`flex items-center gap-6 ${isAlternate ? "flex-row-reverse" : ""}`}
              >
                {/* Content side */}
                <div className="flex-1">
                  <motion.button
                    whileHover={isUnlocked ? { scale: 1.05 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                    onClick={() => onSelectLevel(level.id)}
                    disabled={!isUnlocked}
                    className={`w-full p-4 rounded-2xl border-3 transition-all text-left ${
                      isCompleted
                        ? "bg-gradient-to-r from-green-300 to-green-200 border-green-500 shadow-lg"
                        : isUnlocked
                          ? `bg-gradient-to-r ${level.color} border-white shadow-lg hover:shadow-xl cursor-pointer`
                          : "bg-gray-200 border-gray-400 cursor-not-allowed opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{level.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-800">{level.title}</h3>
                        <p className="text-sm text-gray-700">{level.description}</p>
                      </div>
                      {!isUnlocked && <Lock className="w-5 h-5 text-gray-500 ml-auto" />}
                      {isCompleted && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 ml-auto" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                </div>

                {/* Center circle node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center flex-shrink-0 ${
                    isCompleted
                      ? "bg-green-400 border-green-600 shadow-lg"
                      : isUnlocked
                        ? "bg-white border-blue-400 shadow-md"
                        : "bg-gray-300 border-gray-500"
                  }`}
                >
                  <span className="font-bold text-sm text-gray-800">{level.id}</span>
                </motion.div>

                {/* Empty space for layout */}
                <div className="flex-1" />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 justify-center text-sm mt-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white border-3 border-blue-400" />
          <span className="text-gray-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300 border-3 border-gray-500 flex items-center justify-center">
            <Lock className="w-3 h-3 text-gray-600" />
          </div>
          <span className="text-gray-700">Locked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-400 border-3 border-green-600 flex items-center justify-center">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          </div>
          <span className="text-gray-700">Completed</span>
        </div>
      </div>
    </div>
  )
}
