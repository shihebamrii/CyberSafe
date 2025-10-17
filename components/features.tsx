"use client"

import { Brain, Gamepad2, Puzzle, Trophy } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Learn the Basics",
    description: "Simple lessons about online safety, passwords, and digital citizenship.",
    color: "from-blue-400 to-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    icon: Gamepad2,
    title: "Play & Learn",
    description: "Fun interactive mini-games that make cybersecurity exciting and engaging.",
    color: "from-pink-400 to-pink-500",
    bgColor: "bg-pink-100",
  },
  {
    icon: Puzzle,
    title: "Test Your Skills",
    description: "Quizzes that challenge your knowledge and reward you with badges.",
    color: "from-yellow-400 to-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Become a Cyber Hero and unlock exclusive achievements and badges!",
    color: "from-green-400 to-green-500",
    bgColor: "bg-green-100",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What You'll Learn
            </span>
          </h2>
          <p className="text-xl text-gray-600">Explore our amazing features designed just for you!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div
                    className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>

                {/* Hover accent */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} rounded-full w-0 group-hover:w-full transition-all duration-300`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
