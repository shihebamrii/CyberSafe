"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Confetti from "../play/confetti"

interface ChatSmartGameProps {
  onComplete: () => void
}

interface ChatMessage {
  id: number
  sender: "npc" | "player"
  text: string
  safe?: boolean
}

// Dynamic kiddies-friendly chat system with full responses to all choices
const chatSteps = [
  {
    id: 1,
    npc: "Hey there! I'm CyberFox 🦊. What's something fun you like to do?",
    typing: 1500,
    options: [
      { text: "Playing soccer ⚽", safe: true, next: 2, response: "Awesome! Soccer is super fun and keeps you active! 🏃‍♂️💨" },
      { text: "Sharing my address 🏠", safe: false, next: 2, response: "Hmm, that’s private info! Always keep your address safe. 🔒" },
      { text: "Reading comics 📚", safe: true, next: 2, response: "Comics are great! They make learning and imagination super fun! ✨" },
    ],
  },
  {
    id: 2,
    npc: "Can you tell me a bit about your school or hobbies?",
    typing: 1800,
    options: [
      { text: "Sunshine Elementary", safe: false, next: 3, response: "That's a real school name. Be careful sharing school info online! 🏫" },
      { text: "I like coding 👨‍💻", safe: true, next: 3, response: "Coding is amazing! You can create games, apps, and even chatbots like me! 🤖" },
      { text: "Playing piano 🎹", safe: true, next: 3, response: "Music is magical! Keep playing and have fun! 🎶" },
    ],
  },
  {
    id: 3,
    npc: "Do you want to join a fun online challenge with me?",
    typing: 1700,
    options: [
      { text: "Yes, let's go! 🚀", safe: true, next: 4, response: "Yay! Let’s start! I’ll guide you safely step by step! 🦊" },
      { text: "Sure, here’s my full name & birthday 🆔", safe: false, next: 4, response: "Whoa! Never share your full name and birthday online. It can be dangerous! ⚠️" },
      { text: "No thanks 😅", safe: true, next: 4, response: "No worries! Maybe another time. You’re still learning about online safety! 👍" },
    ],
  },
  {
    id: 4,
    npc: "Last question: what would you like to share online safely?",
    typing: 1500,
    options: [
      { text: "My favorite book 📖", safe: true, next: 5, response: "Great choice! Sharing hobbies is safe and fun! 📚✨" },
      { text: "My phone number 📱", safe: false, next: 5, response: "Oops! Phone numbers are private. Never share them online! 🔒" },
      { text: "Just a funny emoji 😎", safe: true, next: 5, response: "Haha! Emojis are perfect for sharing safely online 😄👍" },
    ],
  },
  {
    id: 5,
    npc: "You did awesome! 🎉 Want to try a mini cyber-safety quiz?",
    typing: 2000,
    options: [
      { text: "Yes, let's go! 🕹️", safe: true, next: "quiz", response: "Great! Let’s test your safety skills! 🦊" },
      { text: "Maybe later 🤔", safe: true, next: "end", response: "No problem! Remember to stay safe online. 🌟" },
    ],
  },
  {
    id: "quiz",
    npc: "Question 1: Which info should you NEVER share online?",
    typing: 2000,
    options: [
      { text: "My pet’s name 🐶", safe: true, next: "quiz2", response: "Good choice! Pet names are usually safe. 🐾" },
      { text: "My home address 🏠", safe: false, next: "quiz2", response: "Correct! Never share your address. Always keep it private! 🔒" },
      { text: "My favorite color 🎨", safe: true, next: "quiz2", response: "Nice! Colors are safe to share! 🌈" },
    ],
  },
  {
    id: "quiz2",
    npc: "Question 2: Is it safe to use the same password everywhere?",
    typing: 1800,
    options: [
      { text: "Yes 😬", safe: false, next: "end", response: "Oops! Using the same password is risky. Try making strong, unique passwords! 🔑" },
      { text: "No 🔒", safe: true, next: "end", response: "Correct! Always use different strong passwords. You're a cyber-safety hero! 🦸‍♂️" },
    ],
  },
  {
    id: "end",
    npc: "You did an amazing job today! 🎉 Remember to always be smart and safe online. See you next time! 🦊",
    typing: 2500,
    options: [],
  },
]

export default function ChatSmartGame({ onComplete }: ChatSmartGameProps) {
  const [currentStepId, setCurrentStepId] = useState<number | string>(1)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [scoreSafe, setScoreSafe] = useState(0)
  const [scoreUnsafe, setScoreUnsafe] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [tutorialFinished, setTutorialFinished] = useState(false)
  const [usedOptions, setUsedOptions] = useState<string[]>([])
  const [npcTyping, setNpcTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const currentStep = chatSteps.find((step) => step.id === currentStepId)

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
  }, [chatHistory, npcTyping])

  // NPC typing & message
  useEffect(() => {
    if (!tutorialFinished || !currentStep) return
    setNpcTyping(true)
    const timer = setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { id: Date.now(), sender: "npc", text: currentStep.npc },
      ])
      setNpcTyping(false)
    }, currentStep.typing)
    return () => clearTimeout(timer)
  }, [currentStepId, tutorialFinished])

  const handleOptionClick = (option: { text: string; safe: boolean; next: number | string; response: string }) => {
    if (npcTyping || usedOptions.includes(option.text)) return

    setChatHistory((prev) => [
      ...prev,
      { id: Date.now(), sender: "player", text: option.text + (option.safe ? " ✅" : " ⚠️"), safe: option.safe },
      { id: Date.now() + 1, sender: "npc", text: option.response },
    ])
    setUsedOptions((prev) => [...prev, option.text])
    if (option.safe) setScoreSafe((prev) => prev + 1)
    else {
      setScoreUnsafe((prev) => prev + 1)
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 1500)
    }
    setTimeout(() => setCurrentStepId(option.next), 800)
  }

  const handlePlayAgain = () => {
    setCurrentStepId(1)
    setChatHistory([])
    setScoreSafe(0)
    setScoreUnsafe(0)
    setShowConfetti(false)
    setTutorialFinished(false)
    setUsedOptions([])
  }

  const getEndingMessage = () => {
    if (scoreUnsafe === 0) return "🎉 Amazing! You kept all your info safe! 🦊"
    if (scoreSafe >= scoreUnsafe) return "Good job! Most of your info was safe. 🛡️"
    return "⚠️ Oops! You shared too much private info. Stay safe online!"
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col space-y-4 relative h-[600px]">
      <AnimatePresence>
        {!tutorialFinished ? (
          <motion.div
            key="tutorial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center space-y-4 p-6 bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl h-full"
          >
            <h2 className="text-3xl font-bold text-center">💬 Chat Smart</h2>
            <p className="text-gray-600 text-center">
              Learn what’s safe to share online and what’s private.
            </p>
            <Button
              onClick={() => setTutorialFinished(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Start Chat
            </Button>
          </motion.div>
        ) : currentStep ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col w-full h-full bg-gradient-to-br from-blue-50 to-pink-50 p-4 rounded-2xl shadow-lg"
          >
            <div ref={chatRef} className="flex flex-col space-y-2 overflow-y-auto p-2 flex-1 rounded-lg bg-gradient-to-b from-gray-100 to-gray-50">
              {chatHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ x: msg.sender === "npc" ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`max-w-[75%] break-words px-4 py-2 rounded-2xl shadow relative ${
                    msg.sender === "npc"
                      ? "bg-white self-start text-gray-900 rounded-bl-none"
                      : msg.safe
                      ? "bg-green-200 self-end text-green-900 rounded-br-none"
                      : "bg-red-200 self-end text-red-900 rounded-br-none"
                  }`}
                >
                  {msg.text}
                  <span className={`absolute bottom-0 w-3 h-3 bg-inherit ${
                    msg.sender === "npc"
                      ? "-left-1 rotate-45 origin-top-left"
                      : "-right-1 rotate-45 origin-top-right"
                  }`}></span>
                </motion.div>
              ))}
              {npcTyping && (
                <div className="self-start flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl shadow animate-pulse relative rounded-bl-none">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                  <span className="text-gray-500 ml-2 text-sm">CyberFox is typing...</span>
                </div>
              )}
            </div>

            {showWarning && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                exit={{ scale: 0 }}
                className="absolute top-4 right-4 text-3xl"
              >
                🦊 Be careful! Private info!
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mt-2">
              {currentStep.options.map((opt) => (
                <motion.button
                  key={opt.text}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionClick(opt)}
                  disabled={usedOptions.includes(opt.text) || npcTyping}
                  className={`px-3 py-2 text-sm sm:text-base font-semibold rounded-2xl flex-1 shadow-sm ${
                    usedOptions.includes(opt.text)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center space-y-4 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg h-full"
          >
            {showConfetti && <Confetti />}
            <h2 className="text-3xl font-bold">🎉 Chat Complete!</h2>
            <p className="text-gray-700 text-center">{getEndingMessage()}</p>
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="px-2 py-1 bg-green-200 rounded-full text-green-900 font-semibold">
                Safe: {scoreSafe}
              </span>
              <span className="px-2 py-1 bg-red-200 rounded-full text-red-900 font-semibold">
                Unsafe: {scoreUnsafe}
              </span>
            </div>
            <Button
              onClick={handlePlayAgain}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Play Again
            </Button>
            <Button
              onClick={onComplete}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg"
            >
              Back to Games
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
