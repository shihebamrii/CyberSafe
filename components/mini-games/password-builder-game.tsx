"use client"

import { useState } from "react"
import { motion, AnimatePresence, type MotionStyle } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import Image from "next/image"

interface PasswordBuilderGameProps {
  onComplete: () => void
}

export default function PasswordBuilderGame({ onComplete }: PasswordBuilderGameProps) {
  const [tutorialFinished, setTutorialFinished] = useState(false)
  const [passwordParts, setPasswordParts] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState("Drag items into the password zone!")
  const [showImage, setShowImage] = useState<null | { src: string }>(null)

  const words = ["fox", "moon", "hero", "cat"]
  const numbers = ["123", "99", "7"]
  const symbols = ["!", "@", "#", "$"]

  // ---------------- Check Strength ----------------
  const checkStrength = () => {
    let score = 0
    if (passwordParts.some((p) => words.includes(p))) score += 25
    if (passwordParts.some((p) => numbers.includes(p))) score += 25
    if (passwordParts.some((p) => symbols.includes(p))) score += 25
    if (passwordParts.length >= 3) score += 25
    if (passwordParts.length > 5) score += 10
    if (passwordParts.length > 7) score += 10
    score = Math.min(score, 100)
    setStrength(score)

    if (score === 25) setMessage("😕 Getting there, but still weak!")
    else if (score === 50) setMessage("🛠 Better, but not perfect yet!")
    else if (score === 100) setMessage("🦊 Awesome! That’s hacker-proof!")
    else setMessage("🔍 Try adding words, numbers, and symbols for a stronger password!")

    triggerImage(score)
    if (score === 100) setTimeout(onComplete, 1200)
  }

  // ---------------- Trigger Image ----------------
  const triggerImage = (score: number) => {
    const basePath = "/fox/expression"
    const imagesByScore: Record<number, string[]> = {
      25: ["notGood.png"],
      50: ["eh.png"],
      100: ["hackerProof.png"],
    }

    const list = imagesByScore[score]
    if (!list || list.length === 0) return

    const filename = list[Math.floor(Math.random() * list.length)]
    const src = `${basePath}/${filename}`

    setShowImage({ src })
    setTimeout(() => setShowImage(null), 2000) // hide after animation
  }

  const handleDrop = (id: string) => {
    if (!passwordParts.includes(id)) {
      setPasswordParts([...passwordParts, id])
      setMessage("✅ Item added!")
    } else {
      setMessage("⚠️ Already used!")
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over?.id === "password-zone") handleDrop(active.id as string)
    setActiveId(null)
  }

  const resetGame = () => {
    setPasswordParts([])
    setStrength(0)
    setMessage("Drag items into the password zone!")
    setTutorialFinished(false)
    setShowImage(null)
  }

  return (
    <div className=" w-full flex flex-col items-center space-y-4 overflow-hidden">
      {/* Floating Animated Image (left side only) */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            key={showImage.src}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <Image
              src={showImage.src}
              alt="Password feedback"
              width={460}
              height={460}
              className="rounded-xl "
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!tutorialFinished ? (
          // ---------------- Tutorial Screen ----------------
          <motion.div
            key="tutorial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center justify-center space-y-4 p-4 sm:p-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Welcome to Password Builder!</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Learn to create a strong password by combining words, numbers, and symbols.
              </p>
            </div>
            <Button
              onClick={() => setTutorialFinished(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Start Game
            </Button>
          </motion.div>
        ) : (
          // ---------------- Actual Game ----------------
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col items-center space-y-4"
          >
            <p className="text-center text-sm sm:text-base text-gray-600">{message}</p>

            <DndContext
              onDragStart={({ active }) => setActiveId(active.id as string)}
              onDragEnd={handleDragEnd}
              onDragCancel={() => setActiveId(null)}
            >
              <PasswordZone passwordParts={passwordParts} />
              <div className="w-full flex flex-col space-y-3 mt-4">
                <Category title="Words" items={words} color="bg-blue-100 text-blue-800" usedItems={passwordParts} />
                <Category title="Numbers" items={numbers} color="bg-yellow-100 text-yellow-800" usedItems={passwordParts} />
                <Category title="Symbols" items={symbols} color="bg-pink-100 text-pink-800" usedItems={passwordParts} />
              </div>
              <DragOverlay>{activeId ? <DragGhost id={activeId} /> : null}</DragOverlay>
            </DndContext>

            {/* Strength Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-green-500"
                animate={{ width: `${strength}%` }}
                transition={{ type: "spring", stiffness: 60 }}
              />
            </div>
            <p className="font-bold text-gray-700 text-sm sm:text-base">Strength: {strength}%</p>

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button
                onClick={checkStrength}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg"
              >
                Check Strength
              </Button>
              <Button onClick={resetGame} variant="outline" className="px-6 py-2 rounded-lg">
                Reset
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------- Password Zone ----------------
function PasswordZone({ passwordParts }: { passwordParts: string[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: "password-zone" })
  return (
    <motion.div
      ref={setNodeRef}
      animate={{ scale: isOver ? 1.05 : 1 }}
      className={`rounded-xl p-3 sm:p-6 w-full flex flex-wrap items-center justify-center min-h-[120px] sm:min-h-[150px] text-base sm:text-xl font-mono tracking-wider border-2 border-dashed ${
        isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-100"
      }`}
    >
      <AnimatePresence>
        {passwordParts.length ? (
          passwordParts.map((p, i) => (
            <motion.span
              key={i}
              initial={{ y: -20, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-1 my-1 inline-block"
            >
              {p}
            </motion.span>
          ))
        ) : (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Drop items here...
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ---------------- Category Component ----------------
interface CategoryProps {
  title: string
  items: string[]
  color: string
  usedItems: string[]
}

function Category({ title, items, color, usedItems }: CategoryProps) {
  return (
    <div className="w-full">
      <p className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">{title}</p>
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {items.map((item) => (
          <DraggableItem key={item} id={item} label={item} color={color} used={usedItems.includes(item)} />
        ))}
      </div>
    </div>
  )
}

// ---------------- Draggable Item ----------------
function DraggableItem({ id, label, color, used }: { id: string; label: string; color: string; used: boolean }) {
  const draggable = useDraggable({ id })
  const { attributes, listeners, setNodeRef, transform, isDragging } = draggable

  const style: MotionStyle = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: used ? 0.4 : isDragging ? 0.5 : 1,
    cursor: used ? "not-allowed" : "grab",
    pointerEvents: used ? "none" : "auto",
  }

  return (
    <motion.div
      ref={setNodeRef}
      {...(!used ? listeners : {})}
      {...(!used ? attributes : {})}
      style={style}
      whileHover={!used ? { scale: 1.05 } : {}}
      className={`${color} rounded-lg px-3 sm:px-4 py-1 sm:py-2 font-bold shadow-sm border border-gray-300 select-none`}
    >
      {label}
    </motion.div>
  )
}

// ---------------- Drag Overlay Ghost ----------------
function DragGhost({ id }: { id: string }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-4 py-2 bg-white border rounded-lg shadow-lg font-bold"
    >
      {id}
    </motion.div>
  )
}
