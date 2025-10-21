"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, ShieldAlert } from "lucide-react"

type Message = {
  id: number
  text: string
  isPhish: boolean
  explanation: string
}

const messages: Message[] = [
  { id: 1, text: "🚨 Urgent! Your account is locked. Click here: www.goggle-security.com", isPhish: true, explanation: "The domain is fake — it’s ‘goggle’, not Google!" },
  { id: 2, text: "🎁 Congrats! You’ve won a free iPhone. Send us your address now!", isPhish: true, explanation: "Free prizes asking for personal info = scam." },
  { id: 3, text: "Your teacher shared a Google Doc with you. View: docs.google.com", isPhish: false, explanation: "The URL is legit — always double-check domains!" },
  { id: 4, text: "We noticed unusual login attempts. Please verify here: paypal.com-secure-login.net", isPhish: true, explanation: "‘paypal.com-secure-login.net’ is a fake domain!" },
  { id: 5, text: "CyberFox: Great job today, detective! 🦊", isPhish: false, explanation: "Safe message from CyberFox!" },
]

export default function PhishingDetectiveGame() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const handleChoice = (isPhish: boolean) => {
    const msg = messages[current]
    const correct = msg.isPhish === isPhish

    setFeedback(correct ? "✅ Correct! You spotted it!" : "❌ Oops! Not quite.")
    if (correct) setScore((prev) => prev + 1)

    setShowExplanation(true)
    setTimeout(() => {
      setShowExplanation(false)
      if (current + 1 < messages.length) setCurrent((prev) => prev + 1)
      else setGameOver(true)
    }, 2500)
  }

  const progress = (current / messages.length) * 100

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl text-center font-extrabold text-blue-800">
            🕵️ Phishing Detective
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          {!gameOver ? (
            <>
              <Progress value={progress} className="w-full h-3 rounded-lg bg-blue-200" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full p-5 rounded-xl bg-white shadow-md text-gray-800 text-center"
                >
                  <p className="text-lg sm:text-xl">{messages[current].text}</p>
                </motion.div>
              </AnimatePresence>

              {!showExplanation ? (
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
                  <Button
                    onClick={() => handleChoice(true)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-3"
                  >
                    🚨 Phishing
                  </Button>
                  <Button
                    onClick={() => handleChoice(false)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl py-3"
                  >
                    ✅ Safe
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-700 text-center"
                >
                  <p className="text-lg font-medium">{feedback}</p>
                  <p className="mt-2 text-sm italic text-gray-500">{messages[current].explanation}</p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center w-full"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3">🦊 Case Closed!</h2>
              <p className="text-lg text-gray-800 mb-2">
                You earned <span className="font-bold">{score}</span> Trust Points!
              </p>
              <p className="text-gray-700 mb-4">
                Great job, Cyber Detective! You’ve unlocked the{" "}
                <span className="font-semibold">Cyber Detective Badge</span>!
              </p>

              <div className="flex justify-center mb-4">
                {score >= 4 ? (
                  <ShieldCheck className="w-16 h-16 text-green-500" />
                ) : (
                  <ShieldAlert className="w-16 h-16 text-yellow-500" />
                )}
              </div>

              <Button
                onClick={() => {
                  setCurrent(0)
                  setScore(0)
                  setGameOver(false)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3"
              >
                🔁 Play Again
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
