export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Upper East Side · Queens · Zoom</p>
          <h1>
            Get strong.
            <br />
            <em>Stay supple.</em>
          </h1>
          <p className="lead">
            Personal training, yoga, and group classes with Adam Delia, in person in NYC or over
            Zoom. Get stronger, move better, and actually enjoy the work.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn">
              Book a session
            </a>
            <a href="#schedule" className="btn btn--ghost">
              See the schedule
            </a>
          </div>
        </div>
        <img
          className="hero__photo"
          src={`${import.meta.env.BASE_URL}adam.jpg`}
          alt="Adam Delia holding his NASM Certified Personal Trainer certificate"
          width={866}
          height={1035}
        />
      </div>
    </section>
  )
}
