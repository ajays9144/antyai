const demos = [
  {
    title: 'Aurora Salon',
    category: 'Beauty & Salon',
    description: 'Premium salon website with AI-powered style consultation, online bookings, and service showcase.',
    image: '/images/salon.jpg',
    href: '/demos/salon.html'
  },
  {
    title: 'The Duckling',
    category: 'Fine Dining Restaurant',
    description: 'Elegant restaurant website with full menu display, table reservations, and ambiance showcase.',
    image: '/images/restaurant.jpg',
    href: '/demos/restaurant.html'
  },
  {
    title: 'A. Taylor Consulting',
    category: 'Business Consulting',
    description: 'Strategic growth partner website with AI strategy, business coaching, and revenue optimization services.',
    image: '/images/consulting.jpg',
    href: '/demos/coaching.html'
  },
  {
    title: 'Smart Tech Store',
    category: 'E-commerce',
    description: 'Modern e-commerce store with curated tech accessories, product catalog, and seamless checkout.',
    image: '/images/ecommerce.jpg',
    href: '/demos/ecommerce.html'
  }
]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See what we have built for businesses just like yours. Click to explore live demos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {demos.map((demo, index) => (
            <a
              key={index}
              href={demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group block"
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={demo.image}
                  alt={demo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Live badge */}
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Live Demo
                </span>
                {/* Title overlay */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-xl drop-shadow-lg">{demo.title}</p>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {demo.category}
                </span>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{demo.description}</p>
                <div className="mt-4 text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Live Demo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
