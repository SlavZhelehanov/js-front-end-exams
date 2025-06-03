const API_URL = "http://localhost:3030/jsonstore/matches/";

const list = document.getElementById("list");

async function fetchAllMatches() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        list.innerHTML = '';

        const data = await response.json();

        for (const [id, { guest, host, score }] of Object.entries(data)) {
            list.innerHTML += `
                <li class="match" id="${id}">
                    <div class="info">
                        <p>${host}</p>
                        <p>${score}</p>
                        <p>${guest}</p>
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

document.getElementById("load-matches").addEventListener("click", fetchAllMatches);