import { useServices } from '../hooks/useSiteData'

export function Services() {
  const { data: services } = useServices()

  return (
    <section className="section" id="services">
      <div className="container">
        <p className="eyebrow">Services</p>
        <h2>Training that fits your life</h2>
        <div className="cards">
          {services.map((s) => (
            <article key={s.title} className="card">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <p className="card__meta">
                <span>{s.format}</span>
                {s.price && <strong>{s.price}</strong>}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
