const API_URL = "http://localhost:3030/jsonstore/records/";

const list = document.getElementById("list");
const loadRrecords = document.getElementById("load-records");

async function fetchData() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const msg = await response.json();
            throw new Error(msg.message);
        }

        list.innerHTML = '';

        const data = await response.json();

        for (const [id, { calories, name, steps, _id }] of Object.entries(data)) {
            list.innerHTML += `
                <li class="record" id=${_id}>
                    <div class="info">
                        <p>${name}</p>
                        <p>${steps}</p>
                        <p>${calories}</p>
                    </div>
                    <div class="btn-wrapper">
                        <button class="change-btn">Change</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </li>
            `;
        }
    } catch (error) { console.error(error); }
}

loadRrecords.addEventListener("click", fetchData);