import { credentials } from '../content'

export function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="container about">
        <img
          className="about__photo"
          src={`${import.meta.env.BASE_URL}adam-teaching.jpg`}
          alt="Adam Delia holding a deep squat with hands in prayer position"
          width={478}
          height={604}
          loading="lazy"
        />
        <div>
          <p className="eyebrow">About Adam</p>
          <h2>Strength and yoga, under one roof</h2>
          <p>
            Most people are told to pick: lift heavy or stretch it out. Adam believes the best
            results come from both. His sessions blend resistance training with the breath work and
            mobility of yoga, so you build muscle without losing range, and feel better walking out
            than you did walking in.
          </p>
          <p>
            As a certified personal trainer, yoga teacher, and nutrition coach, he looks at the whole
            picture. Train one-on-one or in a group class, in person or over Zoom.
          </p>
          <ul className="checklist">
            {credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
