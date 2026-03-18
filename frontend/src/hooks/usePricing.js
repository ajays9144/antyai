import { useState, useEffect } from 'react'

/**
 * Country-based pricing tiers (base prices in USD).
 * Regions grouped by purchasing power.
 */
const REGION_TIERS = {
  tier1: [
    'US', 'CA', 'GB', 'AU', 'NZ', 'DE', 'FR', 'NL', 'SE', 'NO', 'DK', 'FI',
    'CH', 'AT', 'BE', 'IE', 'LU', 'SG', 'JP', 'KR', 'IL', 'IT', 'ES'
  ],
  tier2: [
    'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'PL', 'CZ', 'HU', 'RO', 'HR', 'BG',
    'TR', 'MX', 'BR', 'AR', 'CL', 'CO', 'MY', 'TH', 'CN', 'RU', 'ZA', 'EG',
    'JO', 'LB', 'PT', 'GR'
  ],
  tier3: [] // everything else
}

// Base prices in USD per tier
const BASE_USD = {
  tier1: {
    plans: { starter: 149, growth: 299, pro: 499 },
    services: { businessWebsite: 149, ecommerce: 299, landingPage: 99, redesign: 129, maintenance: 29 }
  },
  tier2: {
    plans: { starter: 119, growth: 229, pro: 399 },
    services: { businessWebsite: 119, ecommerce: 229, landingPage: 79, redesign: 99, maintenance: 19 }
  },
  tier3: {
    plans: { starter: 99, growth: 179, pro: 299 },
    services: { businessWebsite: 99, ecommerce: 179, landingPage: 59, redesign: 79, maintenance: 14 }
  }
}

// Country code → currency code mapping (covers major countries)
const COUNTRY_CURRENCY = {
  US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD', NZ: 'NZD',
  DE: 'EUR', FR: 'EUR', NL: 'EUR', AT: 'EUR', BE: 'EUR', IE: 'EUR',
  LU: 'EUR', FI: 'EUR', IT: 'EUR', ES: 'EUR', PT: 'EUR', GR: 'EUR',
  SE: 'SEK', NO: 'NOK', DK: 'DKK', CH: 'CHF',
  JP: 'JPY', KR: 'KRW', CN: 'CNY', SG: 'SGD',
  IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR',
  AE: 'AED', SA: 'SAR', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR',
  IL: 'ILS', JO: 'JOD', LB: 'LBP', EG: 'EGP',
  PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON', HR: 'EUR', BG: 'BGN',
  TR: 'TRY', RU: 'RUB',
  MX: 'MXN', BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP',
  MY: 'MYR', TH: 'THB', PH: 'PHP', ID: 'IDR', VN: 'VND',
  ZA: 'ZAR', NG: 'NGN', KE: 'KES', GH: 'GHS'
}

// Currency display config
const CURRENCY_CONFIG = {
  USD: { symbol: '$',   decimals: 0 },
  CAD: { symbol: 'C$',  decimals: 0 },
  GBP: { symbol: '£',   decimals: 0 },
  EUR: { symbol: '€',   decimals: 0 },
  AUD: { symbol: 'A$',  decimals: 0 },
  NZD: { symbol: 'NZ$', decimals: 0 },
  INR: { symbol: '₹',   decimals: 0 },
  PKR: { symbol: 'Rs ',  decimals: 0 },
  BDT: { symbol: '৳',   decimals: 0 },
  LKR: { symbol: 'Rs ',  decimals: 0 },
  NPR: { symbol: 'Rs ',  decimals: 0 },
  JPY: { symbol: '¥',   decimals: 0 },
  KRW: { symbol: '₩',   decimals: 0 },
  CNY: { symbol: '¥',   decimals: 0 },
  SGD: { symbol: 'S$',  decimals: 0 },
  AED: { symbol: 'AED ', decimals: 0 },
  SAR: { symbol: 'SAR ', decimals: 0 },
  QAR: { symbol: 'QAR ', decimals: 0 },
  KWD: { symbol: 'KD ',  decimals: 1 },
  BHD: { symbol: 'BD ',  decimals: 1 },
  OMR: { symbol: 'OMR ', decimals: 1 },
  ILS: { symbol: '₪',   decimals: 0 },
  EGP: { symbol: 'E£',  decimals: 0 },
  JOD: { symbol: 'JD ',  decimals: 1 },
  LBP: { symbol: 'L£',  decimals: 0 },
  PLN: { symbol: 'zł',  decimals: 0 },
  CZK: { symbol: 'Kč',  decimals: 0 },
  HUF: { symbol: 'Ft ',  decimals: 0 },
  RON: { symbol: 'lei ', decimals: 0 },
  BGN: { symbol: 'лв',  decimals: 0 },
  TRY: { symbol: '₺',   decimals: 0 },
  RUB: { symbol: '₽',   decimals: 0 },
  SEK: { symbol: 'kr ',  decimals: 0 },
  NOK: { symbol: 'kr ',  decimals: 0 },
  DKK: { symbol: 'kr ',  decimals: 0 },
  CHF: { symbol: 'CHF ', decimals: 0 },
  MXN: { symbol: 'MX$', decimals: 0 },
  BRL: { symbol: 'R$',  decimals: 0 },
  ARS: { symbol: 'AR$', decimals: 0 },
  CLP: { symbol: 'CL$', decimals: 0 },
  COP: { symbol: 'COL$',decimals: 0 },
  MYR: { symbol: 'RM ',  decimals: 0 },
  THB: { symbol: '฿',   decimals: 0 },
  PHP: { symbol: '₱',   decimals: 0 },
  IDR: { symbol: 'Rp ',  decimals: 0 },
  VND: { symbol: '₫',   decimals: 0 },
  ZAR: { symbol: 'R ',   decimals: 0 },
  NGN: { symbol: '₦',   decimals: 0 },
  KES: { symbol: 'KSh ', decimals: 0 },
  GHS: { symbol: 'GH₵', decimals: 0 },
}

function getTier(countryCode) {
  const code = (countryCode || '').toUpperCase()
  if (REGION_TIERS.tier1.includes(code)) return 'tier1'
  if (REGION_TIERS.tier2.includes(code)) return 'tier2'
  return 'tier3'
}

/**
 * Try multiple free geo-IP APIs with fallback.
 * Returns { countryCode, countryName } or null.
 */
async function detectGeo() {
  // API 1: ipwho.is (HTTPS, free, no key needed)
  try {
    const res = await fetch('https://ipwho.is/')
    if (res.ok) {
      const data = await res.json()
      if (data.success !== false) {
        return { countryCode: data.country_code, countryName: data.country }
      }
    }
  } catch { /* try next */ }

  // API 2: ipapi.co (HTTPS, 30k/month free)
  try {
    const res = await fetch('https://ipapi.co/json/')
    if (res.ok) {
      const data = await res.json()
      if (data.country_code) {
        return { countryCode: data.country_code, countryName: data.country_name }
      }
    }
  } catch { /* try next */ }

  // API 3: ip-api.com (HTTP only — works on localhost dev, blocked on HTTPS sites)
  try {
    const res = await fetch('http://ip-api.com/json/?fields=status,country,countryCode')
    if (res.ok) {
      const data = await res.json()
      if (data.status === 'success') {
        return { countryCode: data.countryCode, countryName: data.country }
      }
    }
  } catch { /* all failed */ }

  return null
}

// Round to a "clean" number for nicer display
function roundNice(n) {
  if (n < 100) return Math.round(n)
  if (n < 1000) return Math.round(n / 10) * 10
  if (n < 10000) return Math.round(n / 100) * 100
  if (n < 100000) return Math.round(n / 1000) * 1000
  return Math.round(n / 10000) * 10000
}

function convertPricesNice(basePrices, rate) {
  const result = {}
  for (const [key, val] of Object.entries(basePrices)) {
    result[key] = roundNice(val * rate)
  }
  return result
}

export default function usePricing() {
  const [pricing, setPricing] = useState({
    currency: 'USD',
    symbol: '$',
    decimals: 0,
    plans: BASE_USD.tier3.plans,
    services: BASE_USD.tier3.services
  })
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const detect = async () => {
      try {
        // Step 1: Detect country using fallback chain
        const geo = await detectGeo()
        if (!geo) {
          console.warn('[AntyAI Pricing] Could not detect country, using USD defaults')
          setLoading(false)
          return
        }

        const countryCode = (geo.countryCode || '').toUpperCase()
        const countryName = geo.countryName || ''
        setCountry(countryName)
        console.log(`[AntyAI Pricing] Detected: ${countryName} (${countryCode})`)

        const tier = getTier(countryCode)
        const base = BASE_USD[tier]
        const targetCurrency = COUNTRY_CURRENCY[countryCode] || 'USD'

        // If already USD, no conversion needed
        if (targetCurrency === 'USD') {
          setPricing({
            currency: 'USD',
            symbol: '$',
            decimals: 0,
            plans: base.plans,
            services: base.services
          })
          setLoading(false)
          return
        }

        // Step 2: Get exchange rate USD → local currency
        let rate = 1
        try {
          const rateRes = await fetch(
            'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'
          )
          if (rateRes.ok) {
            const rateData = await rateRes.json()
            rate = rateData.usd?.[targetCurrency.toLowerCase()] || 1
          }
        } catch {
          console.warn('[AntyAI Pricing] Exchange rate fetch failed, using USD')
          setPricing({
            currency: 'USD',
            symbol: '$',
            decimals: 0,
            plans: base.plans,
            services: base.services
          })
          setLoading(false)
          return
        }

        const cfg = CURRENCY_CONFIG[targetCurrency] || { symbol: targetCurrency + ' ', decimals: 0 }
        console.log(`[AntyAI Pricing] Showing ${targetCurrency}, rate: 1 USD = ${rate} ${targetCurrency}`)

        setPricing({
          currency: targetCurrency,
          symbol: cfg.symbol,
          decimals: cfg.decimals,
          plans: convertPricesNice(base.plans, rate),
          services: convertPricesNice(base.services, rate)
        })
      } catch (err) {
        console.error('[AntyAI Pricing] Error:', err)
      } finally {
        setLoading(false)
      }
    }

    detect()
  }, [])

  const formatPrice = (amount) => {
    if (loading) return '...'
    const formatted = pricing.decimals > 0
      ? amount.toFixed(pricing.decimals)
      : amount.toLocaleString()
    return `${pricing.symbol}${formatted}`
  }

  return { pricing, country, loading, formatPrice }
}
