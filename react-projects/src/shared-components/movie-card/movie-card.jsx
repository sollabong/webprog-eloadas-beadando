import './movie-card.css';

const MovieCard = ({ film, onEdit, onDelete, onToggleWatch, genreColor }) => {
  return (
    <div
      className={`movie-card ${film.watched ? 'watched' : ''}`}
      style={{ '--genre-color': genreColor }}
    >
      <div className="card-image">
        {film.watched && <div className="watched-badge">MEGNÉZVE</div>}
      </div>
      <div className="movie-info">
        <h4
          style={{
            borderBottom: `1px solid ${genreColor}44`,
            paddingBottom: '5px',
          }}
        >
          {film.filmcim}
        </h4>
        <div className="info-item">
          <i className="fas fa-tags"></i>
          <span style={{ color: genreColor }}>{film.mufaj}</span>
        </div>
        <div className="info-item">
          <i className="fas fa-hourglass-half"></i>{' '}
          <span>{film.hossz} perc</span>
        </div>
        <div className="info-item">
          <i className="fas fa-palette"></i>
          <span>{film.szines === -1 ? 'Színes' : 'Fekete-fehér'}</span>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="btn btn-watch"
          onClick={() => onToggleWatch(film.fkod)}
        >
          <i className={film.watched ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
        </button>
        <button
          className="btn btn-edit"
          onClick={() => onEdit(film)}
          title="Szerkesztés"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(film.fkod)}
          title="Törlés"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
