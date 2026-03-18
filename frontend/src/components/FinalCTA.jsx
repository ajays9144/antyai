export default function FinalCTA() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background image */}
      <img
        src="/images/banner-dark.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dark/70" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img src="/images/icon-64.png" alt="AntyAI" className="w-14 h-14 mx-auto mb-6 rounded-xl" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Take Your Business Online?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Join 500+ businesses that trust AntyAI to build their digital presence.
          Start today — no upfront payment required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="bg-primary text-white px-8 py-3.5 rounded-lg hover:bg-primary-dark transition font-semibold text-lg shadow-lg shadow-primary/25"
          >
            Get Free Consultation
          </button>
          <button
            onClick={() => scrollTo('query')}
            className="border-2 border-white/30 text-white px-8 py-3.5 rounded-lg hover:bg-white/10 transition font-semibold text-lg"
          >
            Get Instant Quote
          </button>
        </div>
      </div>
    </section>
  )
}
