const API_URL = 'https://gabor-dani-gabor.great-site.net/server/api.php';
let films = [];
let editId = null;

async function loadFilms() {
  const response = await fetch(API_URL);
  films = await response.json();
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('dataBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  films.forEach((film) => {
    const tr = document.createElement('tr');
    const isSzines = film.szines == 1 || film.szines === true;

    tr.innerHTML = `
            <td>${film.filmcim}</td>
            <td>${film.mufaj}</td>
            <td>${film.hossz} perc</td>
            <td>${isSzines ? 'Igen' : 'Nem'}</td>
            <td>
              <button class="btn-edit" onclick="editItem(${film.fkod})">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-delete" onclick="deleteItem(${film.fkod})">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

async function handleSave() {
  const filmcim = document.getElementById('filmcim').value;
  const mufaj = document.getElementById('mufaj').value;
  const hossz = parseInt(document.getElementById('hossz').value);
  const szines = document.getElementById('szines').checked;

  if (!filmcim || !mufaj || !hossz) {
    alert('Kérlek tölts ki minden mezőt!');
    return;
  }

  const filmData = { filmcim, mufaj, hossz, szines };

  if (editId) {
    await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...filmData, fkod: editId }),
    });
    editId = null;
    document.getElementById('saveBtn').innerText = 'Hozzáadás';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filmData),
    });
  }

  resetForm();
  loadFilms();
}

async function deleteItem(id) {
  if (confirm('Biztosan törölni szeretnéd ezt a filmet?')) {
    await fetch(`${API_URL}?fkod=${id}`, { method: 'DELETE' });
    loadFilms();
  }
}

function editItem(id) {
  const film = films.find((f) => f.fkod == id);
  if (!film) return;

  document.getElementById('filmcim').value = film.filmcim;
  document.getElementById('mufaj').value = film.mufaj;
  document.getElementById('hossz').value = film.hossz;
  document.getElementById('szines').checked = film.szines == 1;

  editId = id;
  document.getElementById('saveBtn').innerText = 'Mentés';
  document.querySelector('.crud-form').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
  document.getElementById('filmcim').value = '';
  document.getElementById('mufaj').value = '';
  document.getElementById('hossz').value = '';
  document.getElementById('szines').checked = false;
}

async function handleSearch() {
  const term = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('searchResults');

  if (!term) {
    alert('Kérlek, írj be egy filmcímet!');
    return;
  }

  resultsDiv.innerHTML = '<p class="loading">Keresés az adatbázisban...</p>';

  try {
    const response = await fetch(
      `${API_URL}?kereses=${encodeURIComponent(term)}`
    );
    const data = await response.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = `
                <div class="no-result">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    Sajnos a(z) "<strong>${term}</strong>" című filmet egyetlen mozi sem vetíti jelenleg.
                </div>`;
      return;
    }

    let html =
      '<h3 class="search-title">Találatok a következőre: "' + term + '"</h3>';
    html += '<div class="search-results-grid">';

    data.forEach((item) => {
      html += `
                <div class="search-card">
                    <div class="search-card-header">
                        <i class="fa-solid fa-film"></i>
                        <h4>${item.filmcim}</h4>
                    </div>
                    <p class="mufaj">${item.mufaj}</p>
                    <div class="mozi-info">
                        <p><strong><i class="fa-solid fa-theater-masks"></i> Mozi:</strong> ${item.mozinev}</p>
                        <p><i class="fa-solid fa-map-pin"></i> ${item.mozi_cim}</p>
                    </div>
                </div>`;
    });

    html += '</div>';
    resultsDiv.innerHTML = html;
  } catch (error) {
    console.error('Hiba a keresés során:', error);
    resultsDiv.innerHTML =
      '<p class="error">Hiba történt a lekérdezés közben.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadFilms);
