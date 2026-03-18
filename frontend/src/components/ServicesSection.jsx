import usePricing from '../hooks/usePricing'

const serviceTemplates = [
  {
    title: 'Business Website',
    key: 'businessWebsite',
    description: 'Professional, fast-loading website that represents your brand and converts visitors into customers.',
    features: ['Custom design', 'Mobile responsive', 'SEO optimized', 'Contact forms']
  },
  {
    title: 'E-commerce Store',
    key: 'ecommerce',
    description: 'Full online store with product management, payments, and order tracking built for growth.',
    features: ['Product catalog', 'Payment gateway', 'Order management', 'Inventory tracking']
  },
  {
    title: 'Landing Page',
    key: 'landingPage',
    description: 'High-converting single page designed to capture leads and drive a specific action from visitors.',
    features: ['Conversion focused', 'A/B testable', 'Lead capture', 'Analytics ready']
  },
  {
    title: 'Website Redesign',
    key: 'redesign',
    description: 'Transform your outdated website into a modern, fast, and effective digital presence.',
    features: ['Modern design', 'Speed optimization', 'UX improvement', 'Content refresh']
  },
  {
    title: 'Maintenance & Support',
    key: 'maintenance',
    description: 'Ongoing website maintenance, updates, security patches, and technical support.',
    monthly: true,
    features: ['Regular updates', 'Security patches', 'Backup & recovery', 'Priority support']
  }
]

export default function ServicesSection() {
  const { pricing, loading, formatPrice } = usePricing()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const servicePrice = (service) => {
    const amount = pricing.services[service.key]
    const suffix = service.monthly ? '/mo' : ''
    return loading ? '...' : `From ${formatPrice(amount)}${suffix}`
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to launch, grow, and scale your online business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceTemplates.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition group"
            >
              <h3 className="text-xl font-bold text-dark mb-2">{service.title}</h3>
              <p className={`text-primary font-semibold mb-3 ${loading ? 'animate-pulse' : ''}`}>
                {servicePrice(service)}
              </p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-2.5 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium text-sm"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
