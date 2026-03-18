const solutions = [
  {
    step: '01',
    title: 'Build Your Website',
    description: 'We design and develop a stunning, mobile-first website tailored to your business that loads fast and converts visitors.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    step: '02',
    title: 'Generate Leads',
    description: 'Smart forms, CTAs, and landing pages designed to capture visitor information and turn traffic into paying customers.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    step: '03',
    title: 'Automate & Grow',
    description: 'Automated follow-ups, email responses, and business workflows that save you time and help you scale effortlessly.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
]

export default function SolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            How <span className="text-primary">AntyAI</span> Solves It
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A simple 3-step process to take your business from invisible to unstoppable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition group"
            >
              <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                {solution.step}
              </div>
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition">
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{solution.title}</h3>
              <p className="text-gray-600 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>

        {/* Before / After showcase */}
        <div className="mt-16">
          <img
            src="/images/redesign.jpg"
            alt="Before and After — Outdated website transformed into modern premium design by AntyAI"
            loading="lazy"
            className="w-full rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}
