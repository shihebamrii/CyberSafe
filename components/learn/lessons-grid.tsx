"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Lesson {
  id: number
  title: string
  icon: string // filename under /fox/emoji, e.g. 'strongPass.png'
  description: string
  content: string
}

interface LessonsGridProps {
  lessons: Lesson[]
  completedLessons: number[]
  onSelectLesson: (id: number) => void
}

export default function LessonsGrid({ lessons, completedLessons, onSelectLesson }: LessonsGridProps) {
  const colors = [
    "from-sky-300 to-sky-100",
    "from-yellow-300 to-yellow-100",
    "from-mint-300 to-mint-100",
    "from-pink-300 to-pink-100",
    "from-purple-300 to-purple-100",
    "from-orange-300 to-orange-100",
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div
                className={`bg-gradient-to-br ${colors[index]} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col relative overflow-hidden`}
              >
                {/* Completed badge */}
                {completedLessons.includes(lesson.id) && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                )}

                {/* Background Icon as image */}
                <div className="absolute right-0 bottom-0 opacity-50 transform translate-x-6 translate-y-6">
                  <Image
                    src={`/fox/emoji/${lesson.icon}`}
                    alt={`${lesson.title} icon`}
                    width={220}
                    height={220}
                    className="object-contain"
                  />
                </div>

                {/* Content Container including button */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">{lesson.title}</h3>

                  {/* Description */}
                  <p className="text-navy-700 mb-6 flex-grow">{lesson.description}</p>

                  {/* Button */}
                  <Button
                    onClick={() => onSelectLesson(lesson.id)}
                    className="w-40 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg"
                  >
                    {completedLessons.includes(lesson.id) ? "Review Lesson" : "Start Lesson"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
