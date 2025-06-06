window.addEventListener("load", solve);

function solve() {
    const addBtn = document.getElementById("add-btn");
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const category = document.getElementById("category");
    const checkList = document.getElementById("check-list");
    const contactList = document.getElementById("contact-list");

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

    checkList.addEventListener("click", ev => {
        if(ev.target.classList.contains("edit-btn")) {
            const li = ev.target.parentNode.parentNode;
            const [pName, pPhone, pCategory] = li.querySelectorAll("article>p");

            name.value = pName.textContent.split(": ")[1];
            phone.value = pPhone.textContent.split(": ")[1];
            category.value = pCategory.textContent.split(": ")[1];
            li.remove();
        } else if(ev.target.classList.contains("save-btn")) {
            const li = ev.target.parentNode.parentNode;

            li.lastElementChild.remove();
            li.innerHTML += `<button class="del-btn"></button>`;
            contactList.appendChild(li);
            // const [pName, pPhone, pCategory] = li.querySelectorAll("article>p");
            //
            // name.value = pName.textContent.split(": ")[1];
            // phone.value = pPhone.textContent.split(": ")[1];
            // category.value = pCategory.textContent.split(": ")[1];
            // li.remove();
        }
    });
}
  