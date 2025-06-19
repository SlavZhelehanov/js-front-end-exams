const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadVacationsBtn = document.getElementById('load-vacations');
const addVacationBtn = document.getElementById('add-vacation');
const editVacationBtn = document.getElementById('edit-vacation');
const list = document.getElementById('list');
const inputDate = document.getElementById('from-date');
const inputDays = document.getElementById('num-days');
const inputName = document.getElementById('name');

let tempId;

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

list.addEventListener('click', async e => {
    if (e.target.classList.contains('change-btn')) {
        const div = e.target.parentNode;
        const h2Name = div.querySelector('h2').textContent;
        const [h3Date, h3Days] = div.querySelectorAll('h3');

        tempId = div.id;
        inputDate.value = h3Date.textContent;
        inputDays.value = h3Days.textContent;
        inputName.value = h2Name;
        div.remove();
        addVacationBtn.disabled = true;
        editVacationBtn.disabled = false;
    }
});

editVacationBtn.addEventListener('click', async e => {
    e.preventDefault();

    if (inputDate.value !== '' && inputDays.value !== '' && inputName.value !== '') {
        await fetch(API_URL + tempId, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: inputDate.value,days: inputDays.value,name: inputName.value })
        });

        inputDate.value = '';
        inputDays.value = '';
        inputName.value = '';
        addVacationBtn.disabled = false;
        editVacationBtn.disabled = true;
        getTasks();
    }
});