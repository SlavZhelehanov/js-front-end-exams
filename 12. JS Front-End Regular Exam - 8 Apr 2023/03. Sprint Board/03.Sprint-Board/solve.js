// TODO:
function attachEvents() {
    const API_URL = "http://localhost:3030/jsonstore/tasks/";

    const loadBoardBtn = document.getElementById('load-board-btn');
    const todoSection = document.querySelector("#todo-section>ul");
    const inProgressSection = document.querySelector("#in-progress-section>ul");
    const codeReviewSection = document.querySelector("#code-review-section>ul");
    const doneSection = document.querySelector("#done-section>ul");

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
}

attachEvents();