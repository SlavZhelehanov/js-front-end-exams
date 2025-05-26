window.addEventListener("load", solve);

function solve() {
    const saveBtn = document.getElementById("save");
    const event = document.getElementById("event");
    const note = document.getElementById("note");
    const date = document.getElementById("date");
    const upcomingList = document.getElementById("upcoming-list");
    const rightContainer = document.getElementById("right-container");
    const completedList = document.getElementById("events-list");
    const deleteBtn = document.querySelector(".btn.delete");

    saveBtn.addEventListener("click", fe => {
        fe.preventDefault();

        if (event.value != '' && note.value != '' && date.value != '') {
            upcomingList.innerHTML += `<li class="event-item">
                <div class="event-container">
                    <article>
                        <p>Name: ${event.value}</p>
                        <p>Note: ${note.value}</p>
                        <p>Date: ${date.value}</p>
                    </article>
                    <div class="buttons">
                        <button class="btn edit">Edit</button>
                        <button class="btn done">Done</button>
                    </div>
                </div>
            </li>`;

            event.value = '';
            note.value = '';
            date.value = '';
        }
    });

    rightContainer.addEventListener("click", de => {
        if (de.target.classList.contains("edit")) {
            const item = de.target.closest(".event-item");
            const article = item.querySelector("article");
            const [name, noteText, dateText] = article.querySelectorAll("p");

            event.value = name.textContent.split(": ")[1];
            note.value = noteText.textContent.split(": ")[1];
            date.value = dateText.textContent.split(": ")[1];

            item.remove();
        } else if (de.target.classList.contains("done")) {
            const item = de.target.closest(".event-item");
            item.remove();

            completedList.innerHTML += `<li class="event-item">
                    <article>
                        <p>Name: ${item.querySelector("p:nth-child(1)").textContent}</p>
                        <p>Note: ${item.querySelector("p:nth-child(2)").textContent}</p>
                        <p>Date: ${item.querySelector("p:nth-child(3)").textContent}</p>
                    </article>
            </li>`;
        }
    });

    deleteBtn.addEventListener("click", () => {
        completedList.innerHTML = '';
    });
}