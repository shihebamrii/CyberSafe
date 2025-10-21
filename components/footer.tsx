"use client"

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import React from "react"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-r from-sky-900 via-indigo-900 to-blue-900 text-gray-100 pt-12 pb-6 px-4 sm:px-8 overflow-hidden">
      {/* Background accent shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-sky-400 via-indigo-400 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand Section */}
          <div className="space-y-4 gap-2 flex flex-col">
            <h3 className="text-3xl font-extrabold text-white flex items-center">
              <span>
                <Image src="/fox/logo.png" alt="Icon" width={90} height={90} />
              </span>{" "}
              CyberSafe <span className="text-sky-300">Kids</span>
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              Empowering kids to explore the internet safely through fun, games, and learning adventures!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {["Home", "Learn", "Play", "Quiz"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-sky-300 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              {["About", "Parents", "Contact", "Privacy"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-sky-300 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Stay Connected</h4>
            <p className="text-gray-300 text-sm mb-3">
              Follow CyberFox on social media for tips and challenges!
            </p>
            <div className="flex gap-5 text-xl">
              <a href="#" className="hover:text-sky-300 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-sky-300 transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-sky-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-sky-300 transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0 text-center md:text-left">
            © {currentYear} <span className="font-semibold text-sky-300">CyberSafe Kids</span> — Stay Smart, Stay Safe Online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#terms" className="hover:text-sky-300 transition-colors">
              Terms
            </a>
            <a href="#privacy" className="hover:text-sky-300 transition-colors">
              Privacy
            </a>
            <a href="#cookies" className="hover:text-sky-300 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Mascot Decoration - bottom-right */}
      <div className="absolute right-0 bottom-0">
        <Image src="/fox/footer.png" alt="Mascot" width={100} height={100} />
      </div>
    </footer>
  )
}

