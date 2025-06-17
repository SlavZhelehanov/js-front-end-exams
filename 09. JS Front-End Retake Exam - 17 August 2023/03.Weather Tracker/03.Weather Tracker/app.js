const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadHistoryBtn = document.getElementById("load-history");
const addBtn = document.getElementById("add");
const input = document.getElementById("input");
const list = document.getElementById("list");

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