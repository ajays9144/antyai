# AntyAI - MVP Setup Guide

## Project Structure

```
AntyAI/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/   # All landing page sections
│   │   ├── App.jsx       # Main app with all sections
│   │   └── index.css     # Tailwind setup + theme
│   └── vite.config.js    # Vite config with API proxy
├── backend/           # Node.js + Express API
│   ├── server.js         # Express server + /api/leads
│   ├── services/
│   │   ├── leadService.js    # Google Sheets integration
│   │   └── emailService.js   # Auto-reply + admin notify
│   ├── .env              # Environment variables
│   └── .env.example      # Template
└── google-apps-script/   # Google Apps Script code
    └── Code.gs           # Copy to Google Apps Script
```

## Quick Start (Local Development)

### 1. Start the backend
```bash
cd backend
cp .env.example .env   # Edit with your values
npm install
npm run dev
```

### 2. Start the frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173, backend on http://localhost:3001.
The Vite dev server proxies `/api/*` requests to the backend automatically.

## Google Sheets Setup

### Option 1: Apps Script Webhook (Recommended)

1. Create a new Google Sheet
2. Go to **Extensions > Apps Script**
3. Paste the code from `google-apps-script/Code.gs`
4. Run the `setup()` function once to create headers
5. Click **Deploy > New Deployment**
6. Type: **Web app**
7. Execute as: **Me**
8. Who has access: **Anyone**
9. Copy the deployment URL
10. Paste into `backend/.env` as `GOOGLE_APPS_SCRIPT_URL`

### Sheet Columns
| Timestamp | Name | Email | Country | Business Type | Budget | Message | Query | Source |

## Email Setup (Optional)

For Gmail:
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account > Security > App Passwords
3. Generate an app password for "Mail"
4. Set in `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npx vercel
```
Set the framework preset to **Vite**.

### Backend (Render / Railway)
- Build command: `npm install`
- Start command: `npm start`
- Set all `.env` variables in the dashboard
- Update `FRONTEND_URL` to your Vercel URL

### After Deployment
Update the frontend API calls to point to your deployed backend URL
(or configure Vercel rewrites in `vercel.json`).

## API Reference

### POST /api/leads

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "country": "string",
  "businessType": "string",
  "budget": "string",
  "message": "string",
  "query": "string",
  "source": "form | query"
}
```

**Response:**
```json
{ "success": true, "message": "Lead submitted successfully" }
```

### GET /api/health
Health check endpoint.
