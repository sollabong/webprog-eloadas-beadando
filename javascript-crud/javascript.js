let films = [...initialFilms];

let editId = null;

function renderTable() {
  const tbody = document.getElementById('dataBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  films.forEach((film) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${film.filmcim}</td>
            <td>${film.mufaj}</td>
            <td>${film.hossz} perc</td>
            <td>${film.szines === -1 || film.szines === true ? 'Igen' : 'Nem'}</td>
            <td>
              <button class="btn-edit" onclick="editItem(${film.fkod})" title="Szerkesztés">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-delete" onclick="deleteItem(${film.fkod})" title="Törlés">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

function handleSave() {
  const filmcim = document.getElementById('filmcim').value;
  const mufaj = document.getElementById('mufaj').value;
  const hossz = document.getElementById('hossz').value;
  const szines = document.getElementById('szines').checked;

  if (!filmcim || !mufaj || !hossz) {
    alert('Kérlek tölts ki minden mezőt!');
    return;
  }

  if (editId) {
    films = films.map((f) =>
      f.fkod === editId
        ? { fkod: editId, filmcim, szines, mufaj, hossz: parseInt(hossz) }
        : f
    );
    editId = null;
    document.getElementById('saveBtn').innerText = 'Hozzáadás';
  } else {
    const newFilm = {
      fkod: Date.now(),
      filmcim,
      szines,
      mufaj,
      hossz: parseInt(hossz),
    };
    films.unshift(newFilm);
  }

  resetForm();
  renderTable();
}

function deleteItem(id) {
  if (confirm('Biztosan törölni szeretnéd ezt a filmet?')) {
    films = films.filter((f) => f.fkod !== id);
    renderTable();
  }
}

function editItem(id) {
  const film = films.find((f) => f.fkod === id);

  document.getElementById('filmcim').value = film.filmcim;
  document.getElementById('mufaj').value = film.mufaj;
  document.getElementById('hossz').value = film.hossz;
  document.getElementById('szines').checked = film.szines;

  editId = id;
  document.getElementById('saveBtn').innerText = 'Mentés';

  const formElement = document.querySelector('.crud-form');
  formElement.scrollIntoView({
    behavior: 'smooth',
  });
}

function resetForm() {
  document.getElementById('filmcim').value = '';
  document.getElementById('mufaj').value = '';
  document.getElementById('hossz').value = '';
  document.getElementById('szines').checked = false;
}

document.addEventListener('DOMContentLoaded', renderTable);
