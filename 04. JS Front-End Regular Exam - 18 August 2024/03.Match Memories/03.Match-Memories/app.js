const API_URL = "http://localhost:3030/jsonstore/matches/";

const list = document.getElementById("list");
const host = document.getElementById("host");
const guest = document.getElementById("guest");
const score = document.getElementById("score");
const addMatch = document.getElementById("add-match");
const editMatch = document.getElementById("edit-match");

let tmpId;

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

addMatch.addEventListener("click", async e => {
    e.preventDefault();

    if (host.value != '' && guest.value != '' && score.value != '') {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Contet-Type": "application/json" },
            body: JSON.stringify({ host: host.value, guest: guest.value, score: score.value })
        });

        host.value = '';
        guest.value = '';
        score.value = '';

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        await fetchAllMatches();
    }
});

list.addEventListener("click", e => {
    if (e.target.classList.contains("change-btn")) {
        const li = e.target.parentNode.parentNode;
        const [p1, p2, p3] = li.querySelectorAll(".info>p");

        host.value = p1.textContent;
        score.value = p2.textContent;
        guest.value = p3.textContent;
        tmpId = li.id;
        li.remove();
        addMatch.disabled = true;
        editMatch.disabled = false;
    }
});