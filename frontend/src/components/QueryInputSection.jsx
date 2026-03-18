import { useState } from 'react'
import { submitLead } from '../api/submitLead'

export default function QueryInputSection() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setStatus('loading')
    try {
      await submitLead({ query: query.trim(), source: 'query' })
      setStatus('success')
      setQuery('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="query" className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Tell Us What You Need
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Describe your project in one sentence and we will get back to you with a custom quote within 12 hours.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. "I need a website for my salon business under $500"'
            className="w-full py-4 px-6 pr-32 rounded-xl text-lg bg-white text-gray-800 placeholder-gray-400 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition font-semibold disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Submit'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-300 font-medium">
            Thank you! We will respond within 12 hours.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-300 font-medium">
            Something went wrong. Please try again.
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/70 text-sm">
          <span className="bg-white/10 px-3 py-1 rounded-full">Website Design</span>
          <span className="bg-white/10 px-3 py-1 rounded-full">E-commerce</span>
          <span className="bg-white/10 px-3 py-1 rounded-full">Landing Page</span>
          <span className="bg-white/10 px-3 py-1 rounded-full">Lead Generation</span>
          <span className="bg-white/10 px-3 py-1 rounded-full">Redesign</span>
        </div>
      </div>
    </section>
  )
}
