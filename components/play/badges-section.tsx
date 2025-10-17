"use client"

import { motion } from "framer-motion"

const badges = [
  { emoji: "🕵️", title: "Phish Fighter", description: "Spotted 5 phishing attempts" },
  { emoji: "🔐", title: "Password Pro", description: "Created 3 strong passwords" },
  { emoji: "🛡️", title: "Cyber Defender", description: "Stopped 10 viruses" },
  { emoji: "💬", title: "Chat Guardian", description: "Made 5 safe chat decisions" },
  { emoji: "🧩", title: "Explorer Expert", description: "Found all hidden items" },
]

export default function BadgesSection() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-navy-blue mb-8 text-center">Badges You Can Earn</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-5xl mb-3">{badge.emoji}</div>
            <h3 className="font-bold text-navy-blue mb-2">{badge.title}</h3>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
