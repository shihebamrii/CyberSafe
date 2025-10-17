import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Mascot from "@/components/mascot"
import Parents from "@/components/parents"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-yellow-50 to-green-50">
      <Navbar />
      <Hero />
      <Features />
      <Mascot />
      <Parents />
      <Footer />
    </main>
  )
}
