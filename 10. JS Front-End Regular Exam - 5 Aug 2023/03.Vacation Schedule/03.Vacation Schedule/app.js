const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadVacations = document.getElementById('load-vacations');
const list = document.getElementById('list');

async function getTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    list.innerHTML = '';
    for (const [id, {date, days, name, _id}] of Object.entries(data)) {
        list.innerHTML += `<div class="container">
                        <h2>${name}</h2>
                        <h3>${date}</h3>
                        <h3>${days}</h3>
                        <button class="change-btn">Change</button>
                        <button class="done-btn">Done</button>
                    </div>`;
    }
}

loadVacations.addEventListener('click', getTasks);