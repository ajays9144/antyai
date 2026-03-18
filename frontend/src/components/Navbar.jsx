import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
            <img src="/images/logo-full.png" alt="AntyAI" className="h-8 md:h-9" />
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('services')} className="text-gray-600 hover:text-primary transition">Services</button>
            <button onClick={() => scrollTo('portfolio')} className="text-gray-600 hover:text-primary transition">Portfolio</button>
            <button onClick={() => scrollTo('pricing')} className="text-gray-600 hover:text-primary transition">Pricing</button>
            <button onClick={() => scrollTo('contact')} className="text-gray-600 hover:text-primary transition">Contact</button>
            <button
              onClick={() => scrollTo('hero')}
              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition font-medium"
            >
              Get Free Quote
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => scrollTo('services')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary">Services</button>
            <button onClick={() => scrollTo('portfolio')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary">Portfolio</button>
            <button onClick={() => scrollTo('pricing')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary">Pricing</button>
            <button onClick={() => scrollTo('contact')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary">Contact</button>
            <button
              onClick={() => scrollTo('hero')}
              className="w-full bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition font-medium"
            >
              Get Free Quote
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
