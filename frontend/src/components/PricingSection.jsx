import usePricing from '../hooks/usePricing'

const planTemplates = [
  {
    name: 'Starter',
    key: 'starter',
    period: 'one-time',
    description: 'Perfect for small businesses just getting started online.',
    features: [
      '5-page responsive website',
      'Mobile optimized',
      'Contact form',
      'Basic SEO setup',
      'Social media links',
      '1 month free support'
    ],
    popular: false
  },
  {
    name: 'Growth',
    key: 'growth',
    period: 'one-time',
    description: 'For businesses ready to grow and capture more leads.',
    features: [
      '10-page responsive website',
      'Lead capture system',
      'Google Analytics',
      'Advanced SEO',
      'Blog setup',
      'Email integration',
      '3 months free support'
    ],
    popular: true
  },
  {
    name: 'Pro',
    key: 'pro',
    period: 'one-time',
    description: 'Complete solution for serious businesses ready to scale.',
    features: [
      'Unlimited pages',
      'E-commerce ready',
      'CRM integration',
      'Advanced analytics',
      'Custom features',
      'Priority support',
      'Marketing automation',
      '6 months free support'
    ],
    popular: false
  }
]

export default function PricingSection() {
  const { pricing, country, loading, formatPrice } = usePricing()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            No hidden fees. No surprises. Pick a plan that fits your business.
          </p>
          {country && !loading && (
            <p className="mt-2 text-sm text-primary font-medium">
              Prices shown in {pricing.currency} for {country}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {planTemplates.map((plan, index) => {
            const price = pricing.plans[plan.key]
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition ${
                  plan.popular
                    ? 'bg-primary text-white shadow-2xl shadow-primary/25 scale-105'
                    : 'bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-dark text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-dark'}`}>
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-dark'} ${loading ? 'animate-pulse' : ''}`}>
                    {loading ? '...' : formatPrice(price)}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`mt-3 text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <svg className={`w-4 h-4 shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo('contact')}
                  className={`mt-8 w-full py-3 rounded-lg font-semibold transition ${
                    plan.popular
                      ? 'bg-white text-primary hover:bg-gray-100'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  Get Started
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
