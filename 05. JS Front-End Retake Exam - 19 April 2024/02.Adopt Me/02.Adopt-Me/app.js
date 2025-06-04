window.addEventListener("load", solve);

function solve() {
    const adoptBtn = document.getElementById("adopt-btn");
    const type = document.getElementById("type");
    const age = document.getElementById("age");
    const gender = document.getElementById("gender");
    const adoptionInfo = document.getElementById("adoption-info");

    adoptBtn.addEventListener("click", e => {
        e.preventDefault();

        if (type.value != '' && age.value != '' && gender.value != '') {
            adoptionInfo.innerHTML = `
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
        }
    });
}
