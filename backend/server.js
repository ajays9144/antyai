require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { submitLead } = require('./services/leadService')
const { sendAutoReply, notifyAdmin } = require('./services/emailService')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(u => u.trim())
    : 'http://localhost:5173'
}))
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Submit lead endpoint
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, country, businessType, budget, message, query, source } = req.body

    // Validate required fields
    if (source === 'form') {
      if (!name || !email || !country || !businessType) {
        return res.status(400).json({ error: 'Missing required fields: name, email, country, businessType' })
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' })
      }
    } else if (source === 'query') {
      if (!query || !query.trim()) {
        return res.status(400).json({ error: 'Query is required' })
      }
    } else {
      return res.status(400).json({ error: 'Invalid source. Must be "form" or "query"' })
    }

    // Build lead data
    const lead = {
      timestamp: new Date().toISOString(),
      name: name || '',
      email: email || '',
      country: country || '',
      businessType: businessType || '',
      budget: budget || '',
      message: message || '',
      query: query || '',
      source: source
    }

    // Store in Google Sheets
    await submitLead(lead)

    // Send auto-reply email (non-blocking)
    if (email) {
      sendAutoReply(email, name).catch(err => {
        console.error('Auto-reply email failed:', err.message)
      })
      notifyAdmin(lead).catch(err => {
        console.error('Admin notification failed:', err.message)
      })
    }

    res.json({ success: true, message: 'Lead submitted successfully' })
  } catch (error) {
    console.error('Lead submission error:', error.message)
    res.status(500).json({ error: 'Failed to submit lead. Please try again.' })
  }
})

app.listen(PORT, () => {
  console.log(`AntyAI Backend running on port ${PORT}`)
})
