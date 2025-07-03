// TODO
function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/tasks/";

    const loadButton = document.getElementById("load-button");
    const todoList = document.getElementById("todo-list");

    async function getTasks() {
        const response = await fetch(API_URL);
        const data = await response.json();

        todoList.innerHTML = "";

        for (const [entry, { name, _id }] of Object.entries(data)) {
            todoList.innerHTML += `<li><span>${name}</span><button>Remove</button><button>Edit</button></li>`;
        }
    }

    loadButton.addEventListener("click", async event => {
        event.preventDefault();
        await getTasks();
    });
}

attachEvents();
