// Values come from .env.local (see .env.example). Empty strings mean
// "not configured" and the site uses the sample content instead.
export const config = {
  googleCalendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID ?? '',
  googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY ?? '',
  googleSheetId: import.meta.env.VITE_GOOGLE_SHEET_ID ?? '',
}

// Tab names inside the Google Sheet. Each tab's first row is the header.
export const sheetTabs = {
  services: 'Services',
  testimonials: 'Testimonials',
}
