"use client"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Mascot from "@/components/mascot"
import Parents from "@/components/parents"
import Footer from "@/components/footer"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [gifKey, setGifKey] = useState(Date.now()) // force GIF restart

  useEffect(() => {
    // Start splash screen GIF immediately
    setGifKey(Date.now())

    // Fade out after 4.5s
    const timer = setTimeout(() => setFadeOut(true), 4500)
    // Hide splash screen after 5s
    const hideTimer = setTimeout(() => setLoading(false), 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <>
      {loading && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Add key or timestamp to restart GIF */}
          <img
            key={gifKey}
            src={`/fox/logo.gif?${gifKey}`}
            alt="Logo"
            className="w-60 h-60"
          />
        </div>
      )}

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-yellow-50 to-green-50">
        <Navbar />
        <Hero />
        <Features />
        <Mascot />
        <Parents />
        <Footer />
      </main>
    </>
  )
}
