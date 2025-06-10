window.addEventListener("load", solve);

function solve() {
    const [ place, action, person, addBtn] = document.querySelectorAll("input");
    const taskList = document.querySelector("#task-list");

    addBtn.addEventListener("click", e => {
        e.preventDefault();

        if(place.value !== '' && action.value !== '' && person.value !== '') {
            taskList.innerHTML = `
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
    })
}