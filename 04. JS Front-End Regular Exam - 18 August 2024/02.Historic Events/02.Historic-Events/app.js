window.addEventListener("load", solve);

function solve() {
    const name = document.getElementById("name");
    const time = document.getElementById("time");
    const description = document.getElementById("description");
    const addBtn = document.getElementById("add-btn");
    const previewList = document.getElementById("preview-list");

    addBtn.addEventListener("click", e => {
        e.preventDefault();

        if (name.value != '' && time.value != '' && description.value != '') {
            previewList.innerHTML = `<li>
                <article>
                    <p>${name.value}</p>
                    <p>${time.value}</p>
                    <p>${description.value}</p>
                </article>
                <div class="buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="next-btn">Next</button>
                </div>
            </li>`;

            name.value = '';
            time.value = '';
            description.value = '';
            addBtn.disabled = true;
        }
    });

    previewList.addEventListener("click", e => {
        if (e.target.classList.contains("edit-btn")) {
            const [pName, pTime, pDescription] = previewList.querySelectorAll("article>p");
            
            name.value = pName.textContent;
            time.value = pTime.textContent;
            description.value = pDescription.textContent;
            addBtn.disabled = false;
            previewList.innerHTML = '';
        } else if (false) {

        }
    });
}