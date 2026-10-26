import { About } from './components/About'
import { Areas } from './components/Areas'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Schedule } from './components/Schedule'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'
import { site } from './content'

const year = new Date().getFullYear()

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Schedule />
        <Areas />
        <Testimonials />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>
            © {year} {site.name}
          </span>
          <span>{site.tagline}</span>
        </div>
      </footer>
    </>
  )
}
