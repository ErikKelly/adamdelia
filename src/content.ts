// Default site content. Services and testimonials can be overridden by a
// public Google Sheet (see src/config.ts); everything else lives here.

export type Service = {
  title: string
  description: string
  format: string
  price?: string
}

export type Testimonial = {
  quote: string
  name: string
  detail: string
}

export type Area = {
  name: string
  blurb: string
}

export const site = {
  name: 'Adam Delia',
  tagline: 'Personal training & yoga in NYC and on Zoom',
  // Placeholder: replace with Adam's real address.
  email: 'hello@adamdelia.com',
  instagram: [
    { label: 'Adam Delia', url: 'https://www.instagram.com/dutchie923' },
    { label: 'My Living Yoga', url: 'https://www.instagram.com/mylivingyoga' },
  ],
}

export const credentials = [
  'NASM Certified Personal Trainer',
  '200-Hour Yoga Teacher Training',
  'Nutrition Coach',
]

export const services: Service[] = [
  {
    title: 'Personal Training',
    description:
      'One-on-one resistance training built around your goals, so you get stronger with every session.',
    format: 'In person · Zoom',
  },
  {
    title: 'Yoga',
    description:
      'Private yoga sessions to build mobility, balance, and a steady breath alongside your strength work.',
    format: 'In person · Zoom',
  },
  {
    title: 'Group Classes',
    description: 'Resistance training and yoga classes with a group. Check the schedule for upcoming times.',
    format: 'In person · Zoom',
  },
  {
    title: 'Nutrition Coaching',
    description: 'Practical guidance on eating to support your training and the results you’re after.',
    format: 'In person · Zoom',
  },
]

// Shown only when real testimonials come from the Google Sheet.
export const testimonials: Testimonial[] = []

export const areas: Area[] = [
  {
    name: 'Upper East Side',
    blurb: 'In-person personal training, yoga, and group classes in Manhattan.',
  },
  {
    name: 'Queens',
    blurb: 'In-person personal training, yoga, and group classes in Queens.',
  },
  {
    name: 'Zoom',
    blurb: 'Train with Adam from anywhere: live sessions and classes over Zoom.',
  },
]
