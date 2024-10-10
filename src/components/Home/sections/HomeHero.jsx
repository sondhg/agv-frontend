import heroImage from "../../../assets/images/hero.jpg";

export default function HomeHero() {
  return (
    <section
      id="hero"
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 data-aos="fade-left" className="mb-5 text-5xl font-bold">
            Automated Guided Vehicle
          </h1>
          <p data-aos="fade-right" className="mb-5">
            SUPERVISORY AND CONTROL SOFTWARE
          </p>
          <div data-aos="fade-up" data-aos-delay={50}>
            <a href="#about" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
