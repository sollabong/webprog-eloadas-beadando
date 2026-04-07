import './spa-container.css';

const SpaContainer = () => {
  return (
    <div className="spa-page-container">
      <section className="spa-container">
        <h2>
          <i className="fas fa-database"></i> Single Page App - React Apps
        </h2>
        <div className="spa-apps-container">
          <div className="app-card">
            <div className="app-card-header">
              <i className="fas fa-cloud"></i>
              <h3>First App</h3>
            </div>
            <div className="app-card-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <button type="button" className="btn btn-save">
              Megnézem
            </button>
          </div>
          <div className="app-card">
            <div className="app-card-header">
              <i className="fas fa-tree"></i>
              <h3>Second App</h3>
            </div>
            <div className="app-card-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <button type="button" className="btn btn-save">
              Megnézem
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpaContainer;
