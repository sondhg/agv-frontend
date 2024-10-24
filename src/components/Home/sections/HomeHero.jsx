import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import heroImage from "../../../assets/images/hero.jpg";

export default function HomeHero() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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
        <div>
          <h1 data-aos="fade-left" className="mb-5 text-5xl font-bold">
            Automated Guided Vehicle (AGV)
          </h1>
          <p data-aos="fade-right" className="mb-5">
            SUPERVISORY AND CONTROL SOFTWARE
          </p>
          <div data-aos="fade-up" data-aos-delay={50}>
            {isAuthenticated === false ? (
              <a href="#about" className="btn btn-info">
                Get Started
              </a>
            ) : (
              <div className="space-x-5">
                <NavLink to="/admin/dashboard" className="btn btn-primary">
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/manage-orders"
                  className="btn btn-secondary"
                >
                  Manage Orders
                </NavLink>
                <NavLink to="/admin/schedules" className="btn btn-accent">
                  Schedules
                </NavLink>
                <NavLink to="/admin/agvs" className="btn btn-info">
                  AGVs
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
