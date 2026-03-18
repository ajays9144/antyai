/**
 * Submit lead data.
 *
 * Production: sends directly to Google Apps Script (no backend needed).
 * Development: sends to local backend via Vite proxy (/api/leads).
 */
export async function submitLead(data) {
  const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL

  if (appsScriptUrl && appsScriptUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    // Production — call Google Apps Script directly
    const res = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }, // avoid CORS preflight
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      })
    })

    if (!res.ok) throw new Error('Submission failed')
    return await res.json()
  }

  // Development — call local backend
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error('Submission failed')
  return await res.json()
}
