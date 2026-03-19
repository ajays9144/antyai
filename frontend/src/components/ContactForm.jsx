import { useState, useEffect, useRef, useMemo } from 'react'
import { submitLead } from '../api/submitLead'
import { COUNTRY_CURRENCY, CURRENCY_CONFIG } from '../hooks/usePricing'

// Full country list with code and name
const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan' }, { code: 'AL', name: 'Albania' }, { code: 'DZ', name: 'Algeria' },
  { code: 'AR', name: 'Argentina' }, { code: 'AM', name: 'Armenia' }, { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' }, { code: 'AZ', name: 'Azerbaijan' }, { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' }, { code: 'BY', name: 'Belarus' }, { code: 'BE', name: 'Belgium' },
  { code: 'BO', name: 'Bolivia' }, { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BR', name: 'Brazil' }, { code: 'BN', name: 'Brunei' }, { code: 'BG', name: 'Bulgaria' },
  { code: 'KH', name: 'Cambodia' }, { code: 'CM', name: 'Cameroon' }, { code: 'CA', name: 'Canada' },
  { code: 'CL', name: 'Chile' }, { code: 'CN', name: 'China' }, { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' }, { code: 'HR', name: 'Croatia' }, { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' }, { code: 'DK', name: 'Denmark' }, { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' }, { code: 'EG', name: 'Egypt' }, { code: 'SV', name: 'El Salvador' },
  { code: 'EE', name: 'Estonia' }, { code: 'ET', name: 'Ethiopia' }, { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' }, { code: 'GE', name: 'Georgia' }, { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' }, { code: 'GR', name: 'Greece' }, { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' }, { code: 'HK', name: 'Hong Kong' }, { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' }, { code: 'IN', name: 'India' }, { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' }, { code: 'IQ', name: 'Iraq' }, { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' }, { code: 'IT', name: 'Italy' }, { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' }, { code: 'JO', name: 'Jordan' }, { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' }, { code: 'KW', name: 'Kuwait' }, { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' }, { code: 'LV', name: 'Latvia' }, { code: 'LB', name: 'Lebanon' },
  { code: 'LY', name: 'Libya' }, { code: 'LT', name: 'Lithuania' }, { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macau' }, { code: 'MY', name: 'Malaysia' }, { code: 'MV', name: 'Maldives' },
  { code: 'MT', name: 'Malta' }, { code: 'MX', name: 'Mexico' }, { code: 'MD', name: 'Moldova' },
  { code: 'MN', name: 'Mongolia' }, { code: 'ME', name: 'Montenegro' }, { code: 'MA', name: 'Morocco' },
  { code: 'MM', name: 'Myanmar' }, { code: 'NP', name: 'Nepal' }, { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' }, { code: 'NI', name: 'Nicaragua' }, { code: 'NG', name: 'Nigeria' },
  { code: 'MK', name: 'North Macedonia' }, { code: 'NO', name: 'Norway' }, { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' }, { code: 'PA', name: 'Panama' }, { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' }, { code: 'PH', name: 'Philippines' }, { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' }, { code: 'QA', name: 'Qatar' }, { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' }, { code: 'RW', name: 'Rwanda' }, { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' }, { code: 'RS', name: 'Serbia' }, { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' }, { code: 'SI', name: 'Slovenia' }, { code: 'ZA', name: 'South Africa' },
  { code: 'KR', name: 'South Korea' }, { code: 'ES', name: 'Spain' }, { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' }, { code: 'SE', name: 'Sweden' }, { code: 'CH', name: 'Switzerland' },
  { code: 'TW', name: 'Taiwan' }, { code: 'TZ', name: 'Tanzania' }, { code: 'TH', name: 'Thailand' },
  { code: 'TN', name: 'Tunisia' }, { code: 'TR', name: 'Turkey' }, { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' }, { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' }, { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' }, { code: 'UZ', name: 'Uzbekistan' }, { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' }, { code: 'YE', name: 'Yemen' }, { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' }
]

const initialForm = {
  name: '',
  email: '',
  country: '',
  countryCode: '',
  businessType: '',
  budget: '',
  message: ''
}

const businessTypes = [
  'Salon / Beauty',
  'Restaurant / Cafe',
  'Coaching / Consulting',
  'E-commerce / Retail',
  'Healthcare',
  'Real Estate',
  'Education',
  'Other'
]

// Budget breakpoints in USD — converted to local currency dynamically
const BUDGET_BREAKS = [100, 300, 500, 1000, 2000]

function roundNice(n) {
  if (n < 100) return Math.round(n)
  if (n < 1000) return Math.round(n / 10) * 10
  if (n < 10000) return Math.round(n / 100) * 100
  if (n < 100000) return Math.round(n / 1000) * 1000
  return Math.round(n / 10000) * 10000
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  // Country dropdown state
  const [countrySearch, setCountrySearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Exchange rate for budget conversion
  const [exchangeRate, setExchangeRate] = useState(null)
  const [currencyInfo, setCurrencyInfo] = useState({ symbol: '$', decimals: 0, code: 'USD' })

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Fetch exchange rate when country changes
  useEffect(() => {
    if (!form.countryCode) {
      setExchangeRate(null)
      setCurrencyInfo({ symbol: '$', decimals: 0, code: 'USD' })
      return
    }

    const currency = COUNTRY_CURRENCY[form.countryCode] || 'USD'
    const cfg = CURRENCY_CONFIG[currency] || { symbol: '$', decimals: 0 }
    setCurrencyInfo({ ...cfg, code: currency })

    if (currency === 'USD') {
      setExchangeRate(1)
      return
    }

    fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
      .then(res => res.json())
      .then(data => {
        const rate = data.usd?.[currency.toLowerCase()] || 1
        setExchangeRate(rate)
      })
      .catch(() => setExchangeRate(1))
  }, [form.countryCode])

  // Format a USD amount into local currency
  const fmtLocal = (usd) => {
    if (!exchangeRate) return ''
    const converted = roundNice(usd * exchangeRate)
    const { symbol, decimals } = currencyInfo
    const formatted = decimals > 0 ? converted.toFixed(decimals) : converted.toLocaleString()
    return `${symbol}${formatted}`
  }

  // Generate budget options in local currency
  const budgetOptions = useMemo(() => {
    if (!exchangeRate) return []
    const options = []
    options.push({ value: `Under ${fmtLocal(BUDGET_BREAKS[0])}`, label: `Under ${fmtLocal(BUDGET_BREAKS[0])}` })
    for (let i = 0; i < BUDGET_BREAKS.length - 1; i++) {
      const label = `${fmtLocal(BUDGET_BREAKS[i])} – ${fmtLocal(BUDGET_BREAKS[i + 1])}`
      options.push({ value: label, label })
    }
    const last = BUDGET_BREAKS[BUDGET_BREAKS.length - 1]
    options.push({ value: `${fmtLocal(last)}+`, label: `${fmtLocal(last)}+` })
    return options
  }, [exchangeRate, currencyInfo])

  // Filtered country list
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return COUNTRIES
    const q = countrySearch.toLowerCase()
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    )
  }, [countrySearch])

  const selectCountry = (c) => {
    setForm({ ...form, country: c.name, countryCode: c.code, budget: '' })
    setCountrySearch(c.name)
    setShowDropdown(false)
    if (errors.country) setErrors({ ...errors, country: undefined })
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.country) errs.country = 'Country is required'
    if (!form.businessType) errs.businessType = 'Select a business type'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')
    try {
      await submitLead({ ...form, source: 'form' })
      setStatus('success')
      setForm(initialForm)
      setCountrySearch('')
      setExchangeRate(null)
      setCurrencyInfo({ symbol: '$', decimals: 0, code: 'USD' })
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition text-gray-800`

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fill in the form and we will contact you within 12 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputClass('name')}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={inputClass('email')}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Searchable Country Dropdown */}
            <div ref={dropdownRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <input
                type="text"
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value)
                  setShowDropdown(true)
                  if (form.country) {
                    setForm({ ...form, country: '', countryCode: '', budget: '' })
                  }
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search country..."
                className={inputClass('country')}
                autoComplete="off"
              />
              {showDropdown && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((c) => (
                      <li
                        key={c.code}
                        onClick={() => selectCountry(c)}
                        className="px-4 py-2.5 hover:bg-primary/10 cursor-pointer text-gray-700 text-sm transition"
                      >
                        {c.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2.5 text-gray-400 text-sm">No country found</li>
                  )}
                </ul>
              )}
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className={inputClass('businessType')}
              >
                <option value="">Select type...</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
            </div>
          </div>

          {/* Dynamic Budget Range based on selected country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget Range
              {form.country && currencyInfo.code !== 'USD' && (
                <span className="text-xs text-gray-400 ml-2">(in {currencyInfo.code})</span>
              )}
            </label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={inputClass('budget')}
              disabled={!form.country}
            >
              <option value="">
                {form.country ? 'Select budget...' : 'Select country first...'}
              </option>
              {budgetOptions.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your project..."
              className={inputClass('message')}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary text-white py-3.5 rounded-lg hover:bg-primary-dark transition font-semibold text-lg shadow-lg shadow-primary/25 disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-center text-green-600 font-medium">
              Thank you! We have received your message and will respond within 12 hours.
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-500 font-medium">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
