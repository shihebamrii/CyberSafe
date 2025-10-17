"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-blue-950 to-indigo-950 text-gray-200 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">CyberSafe Kids</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Making cybersecurity fun and accessible for everyone!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#learn" className="hover:text-white transition-colors duration-200">
                  Learn
                </a>
              </li>
              <li>
                <a href="#play" className="hover:text-white transition-colors duration-200">
                  Play
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-white transition-colors duration-200">
                  Quiz
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide">Resources</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#parents" className="hover:text-white transition-colors duration-200">
                  Parents
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors duration-200">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4 tracking-wide">Follow Us</h4>
            <div className="flex gap-6 text-2xl">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                ▶️
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p className="mb-4 md:mb-0">© {currentYear} CyberSafe Kids – Stay Smart, Stay Safe Online.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#cookies" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}