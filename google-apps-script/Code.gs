/**
 * Google Apps Script - AntyAI Lead Storage + Auto Reply
 *
 * SETUP:
 * 1. Go to https://script.google.com → open your existing project
 * 2. Replace ALL code with this updated version
 * 3. Click Deploy → Manage deployments → Edit (pencil icon)
 * 4. Set Version to "New version" → Deploy
 *    (You MUST create a new version for changes to take effect)
 *
 * ADMIN EMAIL:
 * Change the ADMIN_EMAIL below to receive lead notifications.
 */

const SHEET_NAME = 'Leads';
const ADMIN_EMAIL = 'hello@antyai.com';  // Change this to your email

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    // Append the lead as a new row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.country || '',
      data.businessType || '',
      data.budget || '',
      data.message || '',
      data.query || '',
      data.source || ''
    ]);

    // Send auto-reply to user (if email provided)
    if (data.email) {
      sendAutoReply(data.email, data.name);
    }

    // Notify admin about new lead
    notifyAdmin(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Still return success to not break the frontend
    Logger.log('Error: ' + error.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'AntyAI Lead API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Send auto-reply email to the lead
 */
function sendAutoReply(email, name) {
  try {
    const firstName = name ? name.split(' ')[0] : 'there';
    const subject = 'Thanks for contacting AntyAI!';
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">AntyAI</h1>
          <p style="color: #a0a0b0; margin: 4px 0 0; font-size: 13px;">Intelligent Solutions</p>
        </div>
        <div style="padding: 32px; background: #f9fafb; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0F172A; margin-top: 0;">Hi ${firstName}!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for reaching out to AntyAI. We have received your inquiry and our team will review it right away.
          </p>
          <p style="color: #4b5563; line-height: 1.6;">
            <strong>We will respond within 12 hours</strong> with a personalized solution tailored to your business needs.
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
      </div>`;

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
    Logger.log('Auto-reply sent to: ' + email);
  } catch (err) {
    Logger.log('Auto-reply failed: ' + err.message);
  }
}

/**
 * Notify admin about new lead
 */
function notifyAdmin(data) {
  try {
    const source = data.source === 'query' ? 'Quick Query' : 'Contact Form';
    const subject = 'New Lead: ' + (data.name || data.query?.substring(0, 50) || source);
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #6C3CE1;">New Lead — ${source}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Time</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.timestamp || new Date().toISOString()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Country</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.country || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Business</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.businessType || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Budget</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.budget || '-'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Query</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.query || '-'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 8px;">${data.message || '-'}</td></tr>
        </table>
      </div>`;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    Logger.log('Admin notified: ' + subject);
  } catch (err) {
    Logger.log('Admin notification failed: ' + err.message);
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Country',
      'Business Type', 'Budget', 'Message', 'Query', 'Source'
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#6C3CE1').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

// Run this once to set up the sheet
function setup() {
  getOrCreateSheet();
  Logger.log('Sheet setup complete!');
}
