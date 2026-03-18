const nodemailer = require('nodemailer')

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  })
}

async function sendAutoReply(email, name) {
  const transporter = createTransporter()
  if (!transporter) {
    console.log(`[Email Skipped] Auto-reply to ${email} (SMTP not configured)`)
    return
  }

  const firstName = name ? name.split(' ')[0] : 'there'

  await transporter.sendMail({
    from: `"AntyAI" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Thanks for contacting AntyAI!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #6C3CE1; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">AntyAI</h1>
        </div>
        <div style="padding: 32px; background: #f9fafb; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0F172A; margin-top: 0;">Hi ${firstName}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for reaching out to AntyAI. We have received your inquiry and our team
            will review it right away.
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            <strong>We will respond within 12 hours</strong> with a personalized solution
            tailored to your business needs.
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            In the meantime, feel free to reply to this email if you have any additional details to share.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 14px;">
            Best regards,<br/>
            The AntyAI Team<br/>
            hello@antyai.com
          </p>
        </div>
      </div>
    `
  })

  console.log(`Auto-reply sent to ${email}`)
}

async function notifyAdmin(lead) {
  const transporter = createTransporter()
  if (!transporter) {
    console.log(`[Email Skipped] Admin notification (SMTP not configured)`)
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

  await transporter.sendMail({
    from: `"AntyAI Leads" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Lead: ${lead.name || lead.query?.substring(0, 50) || 'Quick Query'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #6C3CE1;">New Lead Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Source</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.source}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Time</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.timestamp}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.name || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.email || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Country</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.country || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Business</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.businessType || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Budget</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.budget || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Query</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.query || '-'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 8px;">${lead.message || '-'}</td></tr>
        </table>
      </div>
    `
  })

  console.log(`Admin notified about lead: ${lead.email || lead.query}`)
}

module.exports = { sendAutoReply, notifyAdmin }
