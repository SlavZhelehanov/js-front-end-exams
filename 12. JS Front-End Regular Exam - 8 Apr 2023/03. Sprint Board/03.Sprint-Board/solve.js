// TODO:
function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/tasks/";

    const loadBoardBtn = document.getElementById('load-board-btn');
    const createTaskBtn = document.getElementById('create-task-btn');
    const inputTitle = document.getElementById('title');
    const inputDescription = document.getElementById('description');
    const boardSection = document.getElementById('board-section');
    const todoSection = document.querySelector("#todo-section>ul");
    const inProgressSection = document.querySelector("#in-progress-section>ul");
    const codeReviewSection = document.querySelector("#code-review-section>ul");
    const doneSection = document.querySelector("#done-section>ul");

    let tempId;

    async function getTasks() {
        const response = await fetch(API_URL);
        const data = await response.json();

        todoSection.innerHTML = "";
        inProgressSection.innerHTML = "";
        codeReviewSection.innerHTML = "";
        doneSection.innerHTML = "";

        for (const [id, {title, description, status, _id}] of Object.entries(data)) {
            const li = document.createElement("li");

            li.setAttribute("id", _id);
            li.setAttribute("class", "task");
            li.innerHTML = `<h3>${title}</h3><p>${description}</p>`;

            switch (status) {
                case "ToDo": {
                    li.innerHTML += `<button>Move to In Progress</button>`;
                    todoSection.appendChild(li);
                    break;
                }
                case "In Progress": {
                    li.innerHTML += `<button>Move to Code Review</button>`;
                    inProgressSection.appendChild(li);
                    break;
                }
                case "Code Review": {
                    li.innerHTML += `<button>Move to Done</button>`;
                    codeReviewSection.appendChild(li);
                    break;
                }
                case "Done": {
                    li.innerHTML += `<button>Close</button>`;
                    doneSection.appendChild(li);
                    break;
                }
                default: { break; }
            }
        }
    }

    loadBoardBtn.addEventListener("click", getTasks);

    createTaskBtn.addEventListener("click", async e => {
        e.preventDefault();

        if (inputTitle.value !== "" || inputDescription.value !== "") {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: inputTitle.value, description: inputDescription.value, status: "ToDo" })
            });

            inputTitle.value = "";
            inputDescription.value = "";
            getTasks();
        }
    });

    boardSection.addEventListener("click", async e => {
        let tempStatus;

        if (e.target.tagName === "BUTTON" && e.target.textContent === "Move to In Progress") {
            const li = e.target.parentElement;

            li.querySelector("button").textContent = "Move to Code Review";
            tempId = li.id;
            tempStatus = "In Progress";
            inProgressSection.appendChild(li);
        } else if (e.target.tagName === "BUTTON" && e.target.textContent === "Move to Code Review") {
            const li = e.target.parentElement;

            li.querySelector("button").textContent = "Move to Done";
            tempId = li.id;
            tempStatus = "Code Review";
            codeReviewSection.appendChild(li);
        } else if (e.target.tagName === "BUTTON" && e.target.textContent === "Move to Done") {
            const li = e.target.parentElement;

            li.querySelector("button").textContent = "Close";
            tempId = li.id;
            tempStatus = "Done";
            doneSection.appendChild(li);
        }

        if (tempId !== undefined) {
            await fetch(API_URL + tempId, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: tempStatus })
            });
            tempId = undefined;
            getTasks();
        }


    });
}

attachEvents();