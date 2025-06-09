const API_URL = "http://localhost:3030/jsonstore/games/";

const gamesList = document.getElementById("games-list");
const loadGamesBtn = document.getElementById("load-games");
const addGameBtn = document.getElementById("add-game");
const name = document.getElementById("g-name");
const type = document.getElementById("type");
const players = document.getElementById("players");

let tempId;

async function getGames() {
    const response = await fetch(API_URL);
    const data = await response.json();

    gamesList.innerHTML = '';
    for (const [id, { name, players, type, _id }] of Object.entries(data)) {
        gamesList.innerHTML += `
        <div class="board-game" id="${_id}">
            <div class="content">
                <p>${name}</p>
                <p>${players}</p>
                <p>${type}</p>
            </div>
            <div class="buttons-container">
                <button class="change-btn">Change</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
        `;
    }
}

loadGamesBtn.addEventListener("click", getGames);

addGameBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (name.value !== '' && players.value !== '' && type.value !== '') {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.value, players: players.value, type: type.value })
        });
        name.value = '';
        players.value = '';
        type.value = '';
        await getGames();
    }
});

