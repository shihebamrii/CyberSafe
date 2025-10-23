"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, ShieldAlert, Award, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: number
  text: string
  isPhish: boolean
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  hints: string[]
  suspiciousElements?: string[]
}

const messages: Message[] = [
  { 
    id: 1, 
    text: "🚨 Urgent! Your account is locked. Click here: www.goggle-security.com", 
    isPhish: true, 
    difficulty: 'easy',
    explanation: "This is a phishing attempt! The domain uses a misspelled version of 'Google' (goggle).", 
    hints: ["Check the URL carefully", "Be wary of urgent messages"],
    suspiciousElements: ["Urgency", "Misspelled domain", "Generic greeting"]
  },
  { 
    id: 2, 
    text: "🎁 Congrats! You've won a free iPhone. Send us your address now!", 
    isPhish: true, 
    difficulty: 'easy',
    explanation: "Classic scam! Free prizes that ask for personal information are usually phishing attempts.", 
    hints: ["If it sounds too good to be true...", "Why would they need your address?"],
    suspiciousElements: ["Free prize", "Request for personal info", "Urgency"]
  },
  { 
    id: 3, 
    text: "Your teacher Mrs. Johnson shared a Google Doc with you: docs.google.com/document/d/1234", 
    isPhish: false, 
    difficulty: 'medium',
    explanation: "This is legitimate! The URL is the real Google Docs domain, and it mentions a specific teacher.", 
    hints: ["Check if the domain is correct", "Is the sender specific?"]
  },
  { 
    id: 4, 
    text: "We noticed unusual login attempts. Please verify here: paypal.com-secure-login.net", 
    isPhish: true, 
    difficulty: 'medium',
    explanation: "Tricky! The URL tries to look legitimate but adds extra words to PayPal's domain.", 
    hints: ["Look at the full domain name", "Notice the unusual URL structure"],
    suspiciousElements: ["Security threat", "Suspicious URL", "Urgency"]
  },
  { 
    id: 5, 
    text: "Dear user, your Netflix subscription has expired. Update payment: netflix-accounts-verify.com", 
    isPhish: true,
    difficulty: 'hard',
    explanation: "This is a sophisticated phishing attempt using a fake Netflix domain.", 
    hints: ["Check the official Netflix domain", "Notice the generic greeting"],
    suspiciousElements: ["Generic greeting", "Payment request", "Fake domain"]
  },
  { 
    id: 6, 
    text: "CyberFox: Great job completing today's cybersecurity lesson! 🦊", 
    isPhish: false, 
    difficulty: 'easy',
    explanation: "This is a legitimate message from CyberFox within our learning platform.", 
    hints: ["Is this within the expected context?", "Does it ask for any action?"]
  }
]



export default function PhishingDetectiveGame() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  const handleChoice = (isPhish: boolean) => {
    const msg = messages[current]
    const correct = msg.isPhish === isPhish
    const multiplier = calculateMultiplier()

    if (correct) {
      setScore((prev) => prev + (10 * multiplier))
      setStreak((prev) => prev + 1)
      setFeedback(`✨ Correct! +${10 * multiplier} points`)
    } else {
      setStreak(0)
      setFeedback("❌ Not quite! Keep trying!")
    }

    setShowExplanation(true)
    setTimeout(() => {
      setShowExplanation(false)
      if (current + 1 < messages.length) setCurrent((prev) => prev + 1)
      else setGameOver(true)
    }, 3000)
  }

  const calculateMultiplier = () => {
    if (streak >= 5) return 3
    if (streak >= 3) return 2
    return 1
  }



  const handleHintClick = () => {
    setHintsUsed((prev) => prev + 1)
    setShowHint(true)
  }

  const progress = (current / messages.length) * 100

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-3xl font-extrabold text-blue-800">
              🕵️ Phishing Detective
            </CardTitle>
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="secondary" className="text-lg px-4 py-1">
              Score: {score}
            </Badge>
            {streak > 0 && (
              <Badge variant="secondary" className="text-lg px-4 py-1">
                🔥 Streak: {streak}
              </Badge>
            )}
          </div>
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
                  className="w-full p-5 rounded-xl bg-white shadow-md text-gray-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      Message {current + 1}/{messages.length}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        messages[current].difficulty === 'easy' 
                          ? 'text-green-600' 
                          : messages[current].difficulty === 'medium'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {messages[current].difficulty.charAt(0).toUpperCase() + messages[current].difficulty.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-lg sm:text-xl text-center">{messages[current].text}</p>
                  
                  {showHint && messages[current].hints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 p-3 bg-yellow-50 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="w-5 h-5 text-yellow-500 mt-1" />
                        <div>
                          <p className="font-medium text-yellow-800">Hints:</p>
                          <ul className="list-disc list-inside text-sm text-yellow-700 mt-1">
                            {messages[current].hints.map((hint, index) => (
                              <li key={index}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {!showExplanation ? (
                <>
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
                  {!showHint && (
                    <Button
                      variant="ghost"
                      onClick={handleHintClick}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      💡 Need a hint?
                    </Button>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full"
                >
                  <div className={`p-4 rounded-lg ${
                    messages[current].isPhish === true ? 'bg-red-50' : 'bg-green-50'
                  }`}>
                    <div className="flex items-start gap-3">
                      {messages[current].isPhish ? (
                        <XCircle className="w-6 h-6 text-red-500 mt-1" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                      )}
                      <div>
                        <p className="text-lg font-medium">{feedback}</p>
                        <p className="mt-2 text-sm">{messages[current].explanation}</p>
                        
                        {messages[current].suspiciousElements && (
                          <div className="mt-3">
                            <p className="font-medium mb-2">Suspicious Elements:</p>
                            <div className="flex flex-wrap gap-2">
                              {messages[current].suspiciousElements.map((element, index) => (
                                <Badge key={index} variant="secondary" className="bg-white/50">
                                  {element}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
