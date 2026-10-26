import { useTestimonials } from '../hooks/useSiteData'

export function Testimonials() {
  const { data: testimonials } = useTestimonials()
  if (testimonials.length === 0) return null

  return (
    <section className="section section--alt" id="testimonials">
      <div className="container">
        <p className="eyebrow">Kind words</p>
        <h2>What clients say</h2>
        <div className="quotes">
          {testimonials.map((t) => (
            <figure key={t.name + t.quote.slice(0, 20)} className="quote">
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.detail && <span> · {t.detail}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
