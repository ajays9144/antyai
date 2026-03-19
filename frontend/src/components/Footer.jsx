export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img src="/images/logo-full-lg.png" alt="AntyAI" className="h-10 brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed">
              Affordable web solutions for small businesses worldwide. Build, grow, and scale your online presence.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollTo('services')} className="hover:text-primary transition">Business Website</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-primary transition">E-commerce Store</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-primary transition">Landing Page</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-primary transition">Website Redesign</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollTo('portfolio')} className="hover:text-primary transition">Portfolio</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="hover:text-primary transition">Pricing</button></li>
              <li><button onClick={() => scrollTo('contact')} className="hover:text-primary transition">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>me@antyai.com</li>
              <li>Available globally</li>
              <li>Response within 12 hours</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AntyAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
