export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-light via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Trusted by 500+ businesses worldwide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight">
              Build Your Business
              <span className="text-primary"> Online Presence</span> That Converts
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
              We help small businesses, coaches, and e-commerce starters get a professional website,
              generate leads, and grow their revenue — all at affordable prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('contact')}
                className="bg-primary text-white px-8 py-3.5 rounded-lg hover:bg-primary-dark transition font-semibold text-lg shadow-lg shadow-primary/25"
              >
                Get Free Consultation
              </button>
              <button
                onClick={() => scrollTo('query')}
                className="border-2 border-primary text-primary px-8 py-3.5 rounded-lg hover:bg-primary hover:text-white transition font-semibold text-lg"
              >
                Get Instant Quote
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No upfront cost
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                24hr response
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Global service
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/dashboard.jpg"
              alt="AntyAI Dashboard - Modern Business Analytics"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
