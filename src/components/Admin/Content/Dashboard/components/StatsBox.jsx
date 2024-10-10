import PropTypes from "prop-types";

export default function StatsBox({ agv_id, dataSocket = {} }) {
  const {
    speed = 0,
    battery = 0,
    obstacle = false,
    location = "N/A",
  } = dataSocket;
  // The ?? operator in JavaScript is known as the nullish coalescing operator.
  // It is used to provide a default value when dealing with null or undefined

  return (
    <>
      <div className="flex w-full">
        <div className="card grid flex-grow place-items-center rounded-box bg-base-300 shadow shadow-neutral-900">
          <h1 className="text-3xl font-extrabold text-info">AGV {agv_id}</h1>
        </div>
        <div className="divider divider-info divider-horizontal"></div>
        <div className="card grid flex-grow rounded-box">
          <div className="stats stats-vertical shadow shadow-neutral-900 lg:stats-horizontal">
            <div className="stat place-items-center">
              <div className="stat-figure text-primary">
                <i className="fa-solid fa-gauge fa-xl"></i>
              </div>
              <div className="stat-title text-white">Speed</div>
              <div className="stat-value text-primary">
                {`${speed} m/s` ?? "N/A"}
              </div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-figure text-success">
                <i className="fa-solid fa-battery-three-quarters fa-xl"></i>
              </div>
              <div className="stat-title text-white">Battery</div>
              <div className="stat-value text-success">
                {`${battery} %` ?? "N/A"}
              </div>
              {battery < 10 ? (
                <div className="stat-desc text-error">Low battery</div>
              ) : null}
            </div>
            <div className="stat place-items-center">
              <div className="stat-figure text-warning">
                <i className="fa-solid fa-triangle-exclamation fa-xl"></i>
              </div>
              <div className="stat-title text-white">Obstacle detected</div>
              <div className="stat-value text-warning">
                {obstacle !== undefined ? obstacle.toString() : "N/A"}{" "}
                {/* convert boolean to string to display */}
              </div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-figure text-accent">
                <i className="fa-solid fa-location-dot fa-xl"></i>
              </div>
              <div className="stat-title text-white">Location</div>
              <div className="stat-value text-accent">{location ?? "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}

StatsBox.propTypes = {
  agv_id: PropTypes.number.isRequired,
  dataSocket: PropTypes.shape({
    speed: PropTypes.number.isRequired,
    battery: PropTypes.number.isRequired,
    obstacle: PropTypes.bool.isRequired,
    location: PropTypes.number.isRequired,
  }).isRequired,
};
