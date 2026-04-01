import './genre-legend.css';

const GenreLegend = ({ genreColors, activeGenre, onGenreClick }) => {
  return (
    <div className="genre-legend-container">
      <div className="genre-legend">
        <div className="legend-header">
        <span>Szűrés műfaj szerint:</span>
        {activeGenre && (
          <button className="clear-filter" onClick={() => onGenreClick(null)}>
            Összes mutatása
          </button>
        )}
      </div>
      <div className="legend-items">
        {Object.entries(genreColors).map(([genre, color]) => (
          <div 
            key={genre} 
            className={`legend-item ${activeGenre === genre ? 'active' : ''} ${activeGenre && activeGenre !== genre ? 'inactive' : ''}`}
            onClick={() => onGenreClick(genre)}
          >
            <span 
              className="legend-dot" 
              style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}88` }}
            ></span>
            <span className="legend-text">{genre}</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default GenreLegend;
