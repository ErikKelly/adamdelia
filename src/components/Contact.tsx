import { useState, type FormEvent } from 'react'
import { services, site } from '../content'

// No backend yet: the form opens the visitor's email client with the
// message pre-filled. Swap for Formspree/Netlify Forms/etc. later.
export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: services[0].title,
    format: 'In person',
    message: '',
  })

  const update = (field: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  function submit(e: FormEvent) {
    e.preventDefault()
    const subject = `${form.interest} (${form.format}) inquiry from ${form.name}`
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section" id="contact">
      <div className="container contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Get in touch</h2>
          <p>
            Tell Adam a little about your goals and whether you’d like to train in person or over
            Zoom.
          </p>
          <ul className="contact__details">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {site.instagram.map((ig) => (
              <li key={ig.url}>
                <a href={ig.url} target="_blank" rel="noreferrer">
                  {ig.label} on Instagram
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="form" onSubmit={submit}>
          <label>
            Name
            <input required value={form.name} onChange={update('name')} />
          </label>
          <label>
            Email
            <input required type="email" value={form.email} onChange={update('email')} />
          </label>
          <label>
            I’m interested in
            <select value={form.interest} onChange={update('interest')}>
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            Format
            <select value={form.format} onChange={update('format')}>
              <option>In person</option>
              <option>Zoom</option>
              <option>Either</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              rows={4}
              value={form.message}
              onChange={update('message')}
              placeholder="Goals, neighborhood, preferred times…"
            />
          </label>
          <button type="submit" className="btn">
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}
