/**
 * Lead Storage Service
 *
 * Option 1 (Default MVP): Google Apps Script Webhook
 * Option 2: Direct Google Sheets API
 *
 * The Apps Script approach is simpler — no service account needed.
 * Just deploy the Apps Script as a web app and set the URL in .env.
 */

async function submitLead(lead) {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

  if (!appsScriptUrl) {
    // Fallback: log to console if no Google Sheets config
    console.log('--- NEW LEAD (no Google Sheets configured) ---')
    console.log(JSON.stringify(lead, null, 2))
    console.log('----------------------------------------------')
    return { success: true, storage: 'console' }
  }

  // Option 1: Apps Script Webhook
  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  })

  if (!response.ok) {
    throw new Error(`Google Apps Script returned ${response.status}`)
  }

  const result = await response.json()
  console.log('Lead stored in Google Sheets:', lead.email || lead.query)
  return result
}

module.exports = { submitLead }
