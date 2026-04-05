import './cinema-selector.css';

const CinemaSelector = ({ moziLista, films, selectedMoziId, onSelectMozi }) => {
  
  const getFilmCount = (moziId) => {
    return films.filter(f => 
      f.moziazonok && f.moziazonok.split(',').includes(moziId.toString())
    ).length;
  };

  const selectedMoziData = moziLista.find(m => Number(m.moziazon) === Number(selectedMoziId));

  return (
    <div className="cinema-selector-container">
      <div className="selector-header">
        <label className="selector-label">
          Szűrés mozi alapján:
        </label>
        <select 
          value={selectedMoziId || ''} 
          onChange={(e) => onSelectMozi(e.target.value)}
          className="cinema-dropdown"
        >
          <option value="">-- Összes mozi mutatása --</option>
          {moziLista.map(mozi => (
            <option key={mozi.moziazon} value={mozi.moziazon}>
              {mozi.mozinev} ({getFilmCount(mozi.moziazon)} film)
            </option>
          ))}
        </select>
      </div>

      {selectedMoziData && (
        <div className="mozi-info-panel">
          <div className="mozi-info-content">
            <h4>{selectedMoziData.mozinev}</h4>
            <div className="mozi-details-grid">
              <p>
                <strong>Cím:</strong> {selectedMoziData.cim}
              </p>
              <p>
                <strong>Telefon:</strong> {selectedMoziData.telefon}
              </p>
              <p>
                <strong>Irányítószám:</strong> {selectedMoziData.irszam}
              </p>
            </div>
          </div>
          <button className="btn-clear" onClick={() => onSelectMozi('')}>
            Szűrés törlése
          </button>
        </div>
      )}
    </div>
  );
};

export default CinemaSelector;