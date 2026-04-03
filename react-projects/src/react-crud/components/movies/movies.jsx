import { useState } from 'react';
import { initialFilms } from '../../data.js';
import MovieCard from '../../../shared-components/movie-card/movie-card.jsx';
import GenreLegend from '../../../shared-components/genre-legend/genre-legend.jsx';
import './movies.css';

const genreColors = {
  dráma: '#00bcd4',
  vígjáték: '#ff9800',
  játékfilm: '#4caf50',
  krimi: '#2196f3',
  animációs: '#9c27b0',
  kalandfilm: '#e91e63',
  dokumentum: '#8bc34a',
  filmszatíra: '#f44336',
  thriller: '#3f51b5',
  fantasy: '#ffeb3b',
  operafilm: '#795548',
  zenés: '#009688',
  ifjúsági: '#ff4081',
  'sci-fi': '#673ab7',
  horror: '#607d8b',
  rövidfilm: '#9e9e9e',
  rajzfilm: '#4caf50',
  természetfilm: '#00e676',
};

const Movies = () => {
  const [films, setFilms] = useState(initialFilms);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    filmcim: '',
    mufaj: '',
    hossz: '',
    szines: -1,
  });
  const [activeGenre, setActiveGenre] = useState(null);
  const filteredFilms = activeGenre
    ? films.filter((film) => film.mufaj === activeGenre)
    : films;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, szines: checked ? -1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editId) {
      setFilms(
        films.map((f) =>
          f.fkod === editId ? { ...formData, fkod: editId } : f
        )
      );
      setEditId(null);
    } else {
      const newFilm = { ...formData, fkod: Date.now() };
      setFilms([newFilm, ...films]);
    }
    setFormData({ filmcim: '', mufaj: '', hossz: '', szines: -1 });
  };

  const deleteItem = (id) => {
    if (window.confirm('Biztosan törlöd ezt a filmet?')) {
      setFilms(films.filter((f) => f.fkod !== id));
    }
  };

  const startEdit = (film) => {
    setFormData({
      filmcim: film.filmcim,
      mufaj: film.mufaj,
      hossz: film.hossz,
      szines: film.szines,
    });
    setEditId(film.fkod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWatch = (id) => {
    setFilms(
      films.map((f) => (f.fkod === id ? { ...f, watched: !f.watched } : f))
    );
  };

  return (
    <section className="crud-section">
      <h2>
        <i className="fas fa-database"></i> React Movie CRUD
      </h2>

      <form onSubmit={handleSave} className="crud-form">
        <div className="form-group">
          <label>Cím</label>
          <input
            type="text"
            name="filmcim"
            value={formData.filmcim}
            onChange={handleChange}
            required
            placeholder="Film címe"
          />
        </div>

        <div className="form-group">
          <label>Műfaj</label>
          <select
            name="mufaj"
            value={formData.mufaj}
            onChange={handleChange}
            required
          >
            <option value="">-- Válassz műfajt --</option>
            {Object.keys(genreColors)
              .sort()
              .map((mufaj) => (
                <option key={mufaj} value={mufaj}>
                  {mufaj}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Időtartam</label>
          <input
            type="number"
            name="hossz"
            value={formData.hossz}
            onChange={handleChange}
            required
            placeholder="Film hossza percben"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="szines"
              checked={formData.szines === -1}
              onChange={handleChange}
            />
            Színes
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-save">
            {editId ? 'Módosítás mentése' : 'Hozzáadás'}
          </button>
        </div>
        <div className="form-actions">
          {editId && (
            <button
              type="button"
              className="btn btn-outline"
              style={{ marginLeft: '8px' }}
              onClick={() => {
                setEditId(null);
                setFormData({ filmcim: '', mufaj: '', hossz: '', szines: -1 });
              }}
            >
              Mégse
            </button>
          )}
        </div>
      </form>

      <GenreLegend
        genreColors={genreColors}
        activeGenre={activeGenre}
        onGenreClick={(genre) =>
          setActiveGenre(activeGenre === genre ? null : genre)
        }
      />

      <div className="movie-grid">
        {filteredFilms.map((film) => (
          <MovieCard
            key={film.fkod}
            film={film}
            onEdit={startEdit}
            onDelete={deleteItem}
            onToggleWatch={toggleWatch}
            genreColor={genreColors[film.mufaj] || '#ffffff'}
          />
        ))}
      </div>
    </section>
  );
};

export default Movies;
