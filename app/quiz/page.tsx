"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import QuizHeader from "@/components/quiz/quiz-header"
import LevelMap from "@/components/quiz/level-map"
import ProgressTracker from "@/components/quiz/progress-tracker"
import QuizModal from "@/components/quiz/quiz-modal"
import BadgesSection from "@/components/quiz/badges-section"

export default function QuizPage() {
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const levels = [
    {
      id: 1,
      title: "Strong Passwords",
      description: "Learn how to create unbreakable passwords",
      color: "from-sky-400 to-blue-400",
      icon: "🔐",
      questions: [
        {
          question: "Which password is the strongest?",
          options: ["password123", "P@ssw0rd!2024", "abc123", "qwerty"],
          correct: 1,
          explanation: "Strong passwords use uppercase, lowercase, numbers, and special characters!",
        },
        {
          question: "How many characters should a strong password have?",
          options: ["At least 4", "At least 8", "At least 16", "Doesn't matter"],
          correct: 1,
          explanation: "At least 8 characters is recommended, but 12+ is even better!",
        },
        {
          question: "Should you use your birthday in your password?",
          options: ["Yes, it's easy to remember", "No, it's easy to guess", "Only if it's secret", "It doesn't matter"],
          correct: 1,
          explanation: "Never use personal information like birthdays - hackers can guess them!",
        },
      ],
    },
    {
      id: 2,
      title: "Online Privacy",
      description: "Protect your personal information online",
      color: "from-yellow-300 to-yellow-400",
      icon: "🔒",
      questions: [
        {
          question: "What should you do before sharing personal info online?",
          options: [
            "Share it with everyone",
            "Check who you're talking to",
            "Post it on social media",
            "Nothing, it's fine",
          ],
          correct: 1,
          explanation: "Always verify who you're talking to before sharing any personal information!",
        },
        {
          question: "Is it safe to use the same password everywhere?",
          options: ["Yes, it's convenient", "No, use different passwords", "Only for social media", "Doesn't matter"],
          correct: 1,
          explanation: "Use unique passwords for each account - if one is hacked, others stay safe!",
        },
        {
          question: "What's a VPN used for?",
          options: [
            "To make internet faster",
            "To hide your location and encrypt data",
            "To download files",
            "Nothing important",
          ],
          correct: 1,
          explanation: "VPNs encrypt your data and hide your location from websites and hackers!",
        },
      ],
    },
    {
      id: 3,
      title: "Spot the Phishing",
      description: "Identify fake emails and websites",
      color: "from-pink-300 to-pink-400",
      icon: "🎣",
      questions: [
        {
          question: "What's a phishing email?",
          options: [
            "An email about fishing",
            "A fake email trying to steal info",
            "An email from your friend",
            "A spam email",
          ],
          correct: 1,
          explanation: "Phishing emails pretend to be from trusted sources to trick you into sharing info!",
        },
        {
          question: "What should you do if you get a suspicious email?",
          options: [
            "Click the link",
            "Reply with your password",
            "Don't click links, report it",
            "Forward it to friends",
          ],
          correct: 2,
          explanation: "Never click links in suspicious emails - report them instead!",
        },
        {
          question: "How can you tell if a website is fake?",
          options: ["It looks pretty", "Check the URL and look for HTTPS", "It has lots of ads", "You can't tell"],
          correct: 1,
          explanation: "Look for HTTPS in the URL and check if the domain name looks legitimate!",
        },
      ],
    },
    {
      id: 4,
      title: "Cyber Etiquette",
      description: "Be respectful and safe online",
      color: "from-green-300 to-green-400",
      icon: "💬",
      questions: [
        {
          question: "What's cyberbullying?",
          options: ["Being mean online", "Hacking someone's account", "Sending spam", "All of the above"],
          correct: 3,
          explanation: "Cyberbullying includes being mean online, hacking, and other harmful behavior!",
        },
        {
          question: "What should you do if someone is cyberbullying you?",
          options: ["Bully them back", "Tell a trusted adult", "Ignore it forever", "Post about it online"],
          correct: 1,
          explanation: "Always tell a trusted adult - they can help you stay safe!",
        },
        {
          question: "Is it okay to share someone else's private photos?",
          options: ["Yes, if it's funny", "No, never without permission", "Only if they're your friend", "It depends"],
          correct: 1,
          explanation: "Never share someone's private photos without permission - it's disrespectful and illegal!",
        },
      ],
    },
    {
      id: 5,
      title: "Device Safety",
      description: "Keep your devices secure",
      color: "from-purple-300 to-purple-400",
      icon: "📱",
      questions: [
        {
          question: "What's malware?",
          options: ["Bad software that harms your device", "A type of email", "A social media app", "A password"],
          correct: 0,
          explanation: "Malware is harmful software that can steal data or damage your device!",
        },
        {
          question: "How often should you update your device?",
          options: ["Never", "Once a year", "As soon as updates are available", "Only when it breaks"],
          correct: 2,
          explanation: "Update your device regularly - updates fix security problems!",
        },
        {
          question: "What should you do before using public WiFi?",
          options: ["Nothing, it's free", "Use a VPN for protection", "Share your password", "Download files"],
          correct: 1,
          explanation: "Always use a VPN on public WiFi to protect your data from hackers!",
        },
      ],
    },
  ]

  const handleLevelComplete = (levelId: number) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels([...completedLevels, levelId])
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
    setSelectedLevel(null)
  }

  const isLevelUnlocked = (levelId: number) => {
    return levelId === 1 || completedLevels.includes(levelId - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <QuizHeader />

        <div className="mt-12">
          <ProgressTracker completed={completedLevels.length} total={levels.length} />
        </div>

        <div className="mt-12">
          <LevelMap
            levels={levels}
            completedLevels={completedLevels}
            selectedLevel={selectedLevel}
            onSelectLevel={(levelId) => {
              if (isLevelUnlocked(levelId)) {
                setSelectedLevel(levelId)
              }
            }}
            isLevelUnlocked={isLevelUnlocked}
          />
        </div>

        <div className="mt-16">
          <BadgesSection completedLevels={completedLevels} totalLevels={levels.length} />
        </div>
      </main>

      {selectedLevel && (
        <QuizModal
          level={levels.find((l) => l.id === selectedLevel)!}
          onClose={() => setSelectedLevel(null)}
          onComplete={() => handleLevelComplete(selectedLevel)}
          showConfetti={showConfetti}
        />
      )}

      <Footer />
    </div>
  )
}
