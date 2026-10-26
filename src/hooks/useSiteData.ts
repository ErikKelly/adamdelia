import { config, sheetTabs } from '../config'
import {
  services as defaultServices,
  testimonials as defaultTestimonials,
  type Service,
  type Testimonial,
} from '../content'
import { fetchPublicEvents, sampleEvents } from '../lib/googleCalendar'
import { fetchSheetRows } from '../lib/googleSheet'
import { useRemoteData } from './useRemoteData'

const loadEvents =
  config.googleCalendarId && config.googleApiKey
    ? () => fetchPublicEvents(config.googleCalendarId, config.googleApiKey)
    : null

// Sheet "Services" tab columns: title, description, format, price (optional)
const loadServices = config.googleSheetId
  ? async (): Promise<Service[]> =>
      (await fetchSheetRows(config.googleSheetId, sheetTabs.services))
        .filter((r) => r.title)
        .map((r) => ({
          title: r.title,
          description: r.description ?? '',
          format: r.format ?? '',
          price: r.price || undefined,
        }))
  : null

// Sheet "Testimonials" tab columns: quote, name, detail
const loadTestimonials = config.googleSheetId
  ? async (): Promise<Testimonial[]> =>
      (await fetchSheetRows(config.googleSheetId, sheetTabs.testimonials))
        .filter((r) => r.quote)
        .map((r) => ({ quote: r.quote, name: r.name ?? '', detail: r.detail ?? '' }))
  : null

const fallbackEvents = sampleEvents()

export const useSchedule = () => useRemoteData(loadEvents, fallbackEvents)
export const useServices = () => useRemoteData(loadServices, defaultServices)
export const useTestimonials = () => useRemoteData(loadTestimonials, defaultTestimonials)
