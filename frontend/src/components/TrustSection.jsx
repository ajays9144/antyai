const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Salon Owner, UK',
    text: 'AntyAI built my website in just 3 days. I started getting booking requests the same week. Incredible value for money!',
    rating: 5
  },
  {
    name: 'Raj P.',
    role: 'Restaurant Owner, India',
    text: 'I had no idea a website could bring so many customers. AntyAI made it simple and affordable. Highly recommend!',
    rating: 5
  },
  {
    name: 'Lisa K.',
    role: 'Life Coach, USA',
    text: 'The lead capture system works like magic. I went from 0 online inquiries to 15+ per week. Game changer.',
    rating: 5
  }
]

const stats = [
  { value: '500+', label: 'Businesses Served' },
  { value: '30+', label: 'Countries' },
  { value: '12hr', label: 'Avg Response Time' },
  { value: '98%', label: 'Client Satisfaction' }
]

const reasons = [
  'Affordable pricing for small businesses',
  'Mobile-first, fast-loading websites',
  'Global service — we work across time zones',
  'Dedicated support for 30 days minimum',
  'No hidden fees or long-term contracts'
]

export default function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-light rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-gray-light rounded-2xl p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-semibold text-dark">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-dark mb-6 text-center">Why Choose AntyAI?</h3>
          <div className="max-w-lg mx-auto space-y-3">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
