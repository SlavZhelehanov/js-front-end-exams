window.addEventListener("load", solve);

function solve() {
    const addBtn = document.getElementById("add-btn");
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const category = document.getElementById("category");
    const checkList = document.getElementById("check-list");

    addBtn.addEventListener("click", ev => {
        ev.preventDefault();

        if (name.value !== '' && phone.value !== '' && category.value !== '') {
            checkList.innerHTML += `
                <li>
                    <article>
                        <p>name: ${name.value}</p>
                        <p>phone: ${phone.value}</p>
                        <p>category: ${category.value}</p>
                    </article>
                    <div class="buttons">
                        <button class="edit-btn"></button>
                        <button class="save-btn"></button>
                    </div>
                </li>
            `;

            name.value = '' ;
            phone.value = '';
            category.value = '';
        }
    });
}
  