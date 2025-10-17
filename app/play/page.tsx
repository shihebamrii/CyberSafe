"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PlayHeader from "@/components/play/play-header"
import ProgressTracker from "@/components/play/progress-tracker"
import GamesGrid from "@/components/play/games-grid"
import BadgesSection from "@/components/play/badges-section"

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PlayHeader />
        <ProgressTracker />
        <GamesGrid />
        <BadgesSection />
      </main>
      <Footer />
    </div>
  )
}
