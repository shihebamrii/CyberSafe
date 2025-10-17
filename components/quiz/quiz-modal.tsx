"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Confetti from "@/components/play/confetti"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface Level {
  id: number
  title: string
  icon: string
  questions: Question[]
}

interface QuizModalProps {
  level: Level
  onClose: () => void
  onComplete: () => void
  showConfetti: boolean
}

export default function QuizModal({ level, onClose, onComplete, showConfetti }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const question = level.questions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]
  const isAnswered = selectedAnswer !== undefined
  const isCorrect = isAnswered && selectedAnswer === question.correct

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showResults) {
      const newAnswers = [...selectedAnswers]
      newAnswers[currentQuestion] = optionIndex
      setSelectedAnswers(newAnswers)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleNext = () => {
    if (currentQuestion < level.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowResults(false)
    } else {
      setQuizComplete(true)
      onComplete()
    }
  }

  const correctCount = selectedAnswers.filter((answer, index) => answer === level.questions[index].correct).length

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        {showConfetti && <Confetti />}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 flex justify-between items-center sticky top-0">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{level.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{level.title}</h2>
                <p className="text-blue-100">
                  Question {currentQuestion + 1} of {level.questions.length}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {!quizComplete ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Question */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectAnswer(index)}
                        disabled={showResults}
                        className={`w-full p-4 rounded-xl text-left font-semibold transition-all border-2 ${
                          selectedAnswer === index
                            ? showResults
                              ? isCorrect
                                ? "bg-green-100 border-green-500 text-green-800"
                                : "bg-red-100 border-red-500 text-red-800"
                              : "bg-blue-100 border-blue-500 text-blue-800"
                            : showResults && index === question.correct
                              ? "bg-green-100 border-green-500 text-green-800"
                              : "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Explanation (shown after answer) */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${isCorrect ? "bg-green-50 border-2 border-green-300" : "bg-blue-50 border-2 border-blue-300"}`}
                  >
                    <p className={`font-semibold ${isCorrect ? "text-green-800" : "text-blue-800"}`}>
                      {isCorrect ? "Correct! " : "Not quite! "}
                      {question.explanation}
                    </p>
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                  {!showResults ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isAnswered}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl disabled:opacity-50"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl"
                    >
                      {currentQuestion < level.questions.length - 1 ? "Next Question" : "Complete Level"}
                    </Button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
              >
                <div className="text-6xl">🎉</div>
                <h3 className="text-3xl font-bold text-gray-800">Level Complete!</h3>
                <p className="text-xl text-gray-600">
                  You got <span className="font-bold text-green-600">{correctCount}</span> out of{" "}
                  <span className="font-bold">{level.questions.length}</span> questions correct!
                </p>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-xl"
                >
                  Back to Level Map
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
