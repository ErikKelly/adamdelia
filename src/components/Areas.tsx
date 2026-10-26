import { areas } from '../content'

export function Areas() {
  return (
    <section className="section section--dark" id="areas">
      <div className="container">
        <p className="eyebrow">Where Adam trains</p>
        <h2>Manhattan, Queens & online</h2>
        <div className="areas">
          {areas.map((a) => (
            <article key={a.name} className="area">
              <h3>{a.name}</h3>
              <p>{a.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
