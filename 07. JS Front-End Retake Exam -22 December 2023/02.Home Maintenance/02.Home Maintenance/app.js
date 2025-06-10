window.addEventListener("load", solve);

function solve() {
    const [ place, action, person, addBtn] = document.querySelectorAll("input");
    const taskList = document.querySelector("#task-list");
    const doneList = document.querySelector("#done-list");

    addBtn.addEventListener("click", e => {
        e.preventDefault();

        if(place.value !== '' && action.value !== '' && person.value !== '') {
            taskList.innerHTML += `
                <li class="clean-task">
                    <article>
                        <p>${place.value}</p>
                        <p>${action.value}</p>
                        <p>${person.value}</p>
                    </article>
                    <div class="buttons">
                        <button class="edit">Edit</button>
                        <button class="done">Done</button>
                    </div>
                </li>
            `;
            place.value = '';
            action.value = '';
            person.value = '';
        }
    });

    taskList.addEventListener("click", e => {
        if(e.target.classList.contains("edit")) {
            const li = e.target.parentNode.parentNode;
            const [pPlace, pAction, pPerson] = li.querySelectorAll("article>p");

            place.value = pPlace.textContent;
            action.value = pAction.textContent;
            person.value = pPerson.textContent;
            li.remove();
        } else if(e.target.classList.contains("done")) {
            const li = e.target.parentNode.parentNode;

            li.querySelector(".buttons").remove();
            li.innerHTML += `<button class="delete">Delete</button>`;
            doneList.appendChild(li);
        }
    });
}