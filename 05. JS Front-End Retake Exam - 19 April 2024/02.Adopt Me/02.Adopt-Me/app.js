window.addEventListener("load", solve);

function solve() {
    const adoptBtn = document.getElementById("adopt-btn");
    const type = document.getElementById("type");
    const age = document.getElementById("age");
    const gender = document.getElementById("gender");
    const adoptionInfo = document.getElementById("adoption-info");
    const adoptedList = document.getElementById("adopted-list");

    adoptBtn.addEventListener("click", e => {
        e.preventDefault();

        if (type.value != '' && age.value != '' && gender.value != '') {
            adoptionInfo.innerHTML += `
                <li>
                    <article>
                        <p>Pet:${type.value}</p>
                        <p>Gender:${gender.value}</p>
                        <p>Age:${age.value}</p>
                    </article>
                    <div class="buttons">
                        <button class="edit-btn">Edit</button>
                        <button class="done-btn">Done</button>
                    </div>
                </li>
            `;

            type.value = '';
            age.value = '';
            gender.value = '';
        }
    });

    adoptionInfo.addEventListener("click", e => {
        if (e.target.classList.contains("edit-btn")) {
            const li = e.target.parentNode.parentNode;
            const [pPet, pGender, pAge] = li.querySelectorAll("article>p");

            type.value = pPet.textContent.split(":")[1];
            age.value = pAge.textContent.split(":")[1];
            gender.value = pGender.textContent.split(":")[1];
            li.remove();
        } else if (e.target.classList.contains("done-btn")) {
            const li = e.target.parentNode.parentNode;

            e.target.parentNode.remove();
            li.innerHTML += `<button class="clear-btn">Clear</button>`;
            adoptedList.appendChild(li);
        }
    });

    adoptedList.addEventListener("click", e => {
        if (e.target.classList.contains("clear-btn")) e.target.parentNode.remove();
    });
}