import { useMemo, useState } from 'react'
import { useSchedule } from '../hooks/useSiteData'
import type { CalendarEvent } from '../lib/googleCalendar'

type Filter = 'All' | 'Upper East Side' | 'Queens' | 'Zoom'
const filters: Filter[] = ['All', 'Upper East Side', 'Queens', 'Zoom']

const queensWords = ['queens', 'astoria', 'long island city', 'lic', 'sunnyside']
const uesWords = ['upper east', 'ues', 'yorkville', 'lenox', 'carnegie', 'central park', 'schurz']

function areaOf(e: CalendarEvent): Filter | null {
  const text = `${e.location} ${e.title}`.toLowerCase()
  if (text.includes('zoom')) return 'Zoom'
  if (queensWords.some((w) => text.includes(w))) return 'Queens'
  if (uesWords.some((w) => text.includes(w))) return 'Upper East Side'
  return null
}

const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
const timeFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })

export function Schedule() {
  const { data: events, loading, isFallback } = useSchedule()
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () => events.filter((e) => filter === 'All' || areaOf(e) === filter),
    [events, filter],
  )

  return (
    <section className="section" id="schedule">
      <div className="container">
        <p className="eyebrow">Schedule</p>
        <h2>Upcoming group classes</h2>
        <p className="section__intro">
          Join a group class in person or on Zoom, or{' '}
          <a href="#contact">get in touch</a> to book a private session at a time that works for
          you.
        </p>

        <div className="filters" role="group" aria-label="Filter by area">
          {filters.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? 'chip--active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="note">Loading schedule…</p>
        ) : visible.length === 0 ? (
          <p className="note">No classes scheduled here right now — check back soon.</p>
        ) : (
          <ul className="schedule">
            {visible.map((e) => (
              <li key={e.id} className="schedule__item">
                <div className="schedule__date">
                  <strong>{dayFmt.format(e.start)}</strong>
                  <span>
                    {timeFmt.format(e.start)} – {timeFmt.format(e.end)}
                  </span>
                </div>
                <div className="schedule__body">
                  <h3>{e.title}</h3>
                  {e.location && <p>{e.location}</p>}
                </div>
                {areaOf(e) && <span className="tag">{areaOf(e)}</span>}
              </li>
            ))}
          </ul>
        )}

        {isFallback && !loading && (
          <p className="note note--muted">
            Sample schedule. Connect a public Google Calendar in <code>.env.local</code> to show
            real classes.
          </p>
        )}
      </div>
    </section>
  )
}
