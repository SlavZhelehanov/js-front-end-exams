const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadVacationsBtn = document.getElementById('load-vacations');
const addVacationBtn = document.getElementById('add-vacation');
const editVacationBtn = document.getElementById('edit-vacation');
const list = document.getElementById('list');
const inputDate = document.getElementById('from-date');
const inputDays = document.getElementById('num-days');
const inputName = document.getElementById('name');

async function getTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    list.innerHTML = '';
    for (const [id, {date, days, name, _id}] of Object.entries(data)) {
        list.innerHTML += `<div class="container" id="${_id}">
                        <h2>${name}</h2>
                        <h3>${date}</h3>
                        <h3>${days}</h3>
                        <button class="change-btn">Change</button>
                        <button class="done-btn">Done</button>
                    </div>`;
    }
}

loadVacationsBtn.addEventListener('click', getTasks);

addVacationBtn.addEventListener('click', async e => {
    e.preventDefault();

    if (inputDate.value !== '' && inputDays.value !== '' && inputName.value !== '') {
        await fetch(API_URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: inputDate.value,days: inputDays.value,name: inputName.value })
        });

        inputDate.value = '';
        inputDays.value = '';
        inputName.value = '';
        getTasks();
    }
});