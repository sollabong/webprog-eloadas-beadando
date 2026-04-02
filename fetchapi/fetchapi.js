const API_URL = 'http://localhost/webprog-eloadas-beadando/fetchapi/server/api.php';
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
            body: JSON.stringify({ ...filmData, fkod: editId })
        });
        editId = null;
        document.getElementById('saveBtn').innerText = 'Hozzáadás';
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filmData)
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
    if(!film) return;

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

document.addEventListener('DOMContentLoaded', loadFilms);