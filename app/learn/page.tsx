"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LearnHeader from "@/components/learn/learn-header"
import LessonsGrid from "@/components/learn/lessons-grid"
import ProgressBar from "@/components/learn/progress-bar"
import LessonModal from "@/components/learn/lesson-modal"

export default function LearnPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  const lessons = [
    {
      id: 1,
      title: "Strong Passwords",
      icon: "🧠",
      description: "Learn how to create passwords that hackers can't guess.",
      content:
        "A strong password is like a secret code that only you know! Use a mix of uppercase and lowercase letters, numbers, and symbols. Make it at least 12 characters long and avoid using your name or birthday. Never share your password with anyone, not even your best friend!",
    },
    {
      id: 2,
      title: "Keep It Private",
      icon: "🔒",
      description: "Understand what's safe (and not safe) to share online.",
      content:
        "Your personal information is precious! Never share your full name, address, phone number, or school name with strangers online. Be careful about what photos you post - once something is online, it can stay there forever. Ask a trusted adult before sharing anything!",
    },
    {
      id: 3,
      title: "Spot the Phish",
      icon: "🚫",
      description: "Can you tell which messages are fake? Let's find out!",
      content:
        "Phishing is when bad guys try to trick you into giving them your information. They might pretend to be your friend or a company you trust. Watch out for messages asking you to click suspicious links or download files. When in doubt, ask a trusted adult!",
    },
    {
      id: 4,
      title: "Secure Your Device",
      icon: "🖥️",
      description: "Updates and antivirus keep your computer healthy.",
      content:
        "Your device needs protection just like your body needs a healthy immune system! Keep your software updated - these updates fix security problems. Use antivirus software and never download files from untrusted sources. Lock your device with a strong password!",
    },
    {
      id: 5,
      title: "Be Kind Online",
      icon: "💬",
      description: "Think before you post — respect others everywhere.",
      content:
        "The internet is a community, and we should treat others with kindness and respect. Think before you post - would you say this to someone's face? Never bully or make fun of others online. If you see cyberbullying, tell a trusted adult and don't join in!",
    },
    {
      id: 6,
      title: "Digital Balance",
      icon: "🧩",
      description: "It's great to go online, but don't forget offline fun!",
      content:
        "The internet is amazing, but real life is too! Make sure to spend time playing outside, reading books, and spending time with friends and family. Take breaks from screens - your eyes and brain need rest. Balance is the key to a healthy digital life!",
    },
  ]

  const handleMarkDone = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
    }
    setSelectedLesson(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-yellow-50 to-green-50">
      <Navbar />
      <LearnHeader />
      <ProgressBar completed={completedLessons.length} total={lessons.length} />
      <LessonsGrid lessons={lessons} completedLessons={completedLessons} onSelectLesson={setSelectedLesson} />
      {selectedLesson !== null && (
        <LessonModal
          lesson={lessons.find((l) => l.id === selectedLesson)!}
          isCompleted={completedLessons.includes(selectedLesson)}
          onMarkDone={() => handleMarkDone(selectedLesson)}
          onClose={() => setSelectedLesson(null)}
        />
      )}
      <Footer />
    </main>
  )
}
