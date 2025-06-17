const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadHistoryBtn = document.getElementById("load-history");
const addWeatherBtn = document.getElementById("add-weather");
const editWeatherBtn = document.getElementById("edit-weather");
const list = document.getElementById("list");
const inputLocation = document.getElementById("location");
const inputTemperature = document.getElementById("temperature");
const inputDate = document.getElementById("date");

async function getTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    list.innerHTML = '';

    for (const [id, { location, temperature, date, _id }] of Object.entries(data)) {
        list.innerHTML += `
                    <div class="container" id="${_id}">
                        <h2>${location}</h2>
                        <h3>${date}</h3>
                        <h3 id="celsius">${temperature}</h3>
                        <div id="buttons-container">  
                            <button class="change-btn">Change</button>
                            <button class="delete-btn">Delete</button>
                        </div>                        
                    </div>`;
    }
}

loadHistoryBtn.addEventListener("click", getTasks);

addWeatherBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (inputLocation.value !== '' && inputTemperature.value !== '' && inputDate.value !== '') {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location: inputLocation.value, temperature: inputTemperature.value, date: inputDate.value })
        });

        inputLocation.value = '';
        inputTemperature.value = '';
        inputDate.value = '';
        await getTasks();
    }
});