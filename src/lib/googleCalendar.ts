export type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  location: string
  description: string
}

type ApiEvent = {
  id: string
  summary?: string
  location?: string
  description?: string
  start: { dateTime?: string; date?: string }
  end: { dateTime?: string; date?: string }
}

// Reads upcoming events from a *public* Google Calendar using the
// Calendar API v3. Only a browser API key is needed, no OAuth.
export async function fetchPublicEvents(
  calendarId: string,
  apiKey: string,
  { days = 21, max = 50 }: { days?: number; max?: number } = {},
): Promise<CalendarEvent[]> {
  const now = new Date()
  const until = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
  const params = new URLSearchParams({
    key: apiKey,
    timeMin: now.toISOString(),
    timeMax: until.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: String(max),
  })
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Google Calendar request failed (${res.status})`)
  const data: { items?: ApiEvent[] } = await res.json()

  return (data.items ?? []).map((e) => ({
    id: e.id,
    title: e.summary ?? 'Session',
    start: new Date(e.start.dateTime ?? e.start.date ?? ''),
    end: new Date(e.end.dateTime ?? e.end.date ?? ''),
    location: e.location ?? '',
    description: e.description ?? '',
  }))
}

// Placeholder schedule shown until a calendar is configured.
export function sampleEvents(): CalendarEvent[] {
  const slots: [number, number, string, string][] = [
    [1, 7, 'My Living Yoga', 'Queens'],
    [1, 18, 'Personal Training', 'Upper East Side'],
    [2, 12, 'Resistance Training', 'Zoom'],
    [3, 8, 'Personal Training', 'Upper East Side'],
    [4, 19, 'My Living Yoga', 'Queens'],
    [5, 18, 'Resistance Training', 'Zoom'],
    [6, 10, 'My Living Yoga', 'Queens'],
  ]
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return slots.map(([dayOffset, hour, title, location], i) => {
    const start = new Date(today)
    start.setDate(today.getDate() + dayOffset)
    start.setHours(hour)
    const end = new Date(start.getTime() + 60 * 60 * 1000)
    return { id: `sample-${i}`, title, start, end, location, description: '' }
  })
}
