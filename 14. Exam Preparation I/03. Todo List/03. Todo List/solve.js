// TODO
function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/tasks/";

    const loadButton = document.getElementById("load-button");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const title = document.getElementById("title");

    let tempId;

    async function getTasks() {
        const response = await fetch(API_URL);
        const data = await response.json();

        todoList.innerHTML = "";

        for (const [entry, { name, _id }] of Object.entries(data)) {
            todoList.innerHTML += `<li id="${_id}"><span>${name}</span><button>Remove</button><button>Edit</button></li>`;
        }
    }

    loadButton.addEventListener("click", async event => {
        event.preventDefault();
        await getTasks();
    });

    addButton.addEventListener("click", async event => {
        event.preventDefault();

        if (title.value !== '') {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: title.value })
            });

            title.value = "";
            await getTasks();
        }
    });

    todoList.addEventListener("click", async event => {
        event.preventDefault();

        if (event.target.tagName === "BUTTON" && event.target.textContent === "Remove") {
            tempId = event.target.parentNode.id;

            await fetch(API_URL + tempId, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            await getTasks();
        }
    });
}

attachEvents();
