window.addEventListener("load", solve);

function solve() {
    const addBtn = document.getElementById("add-btn");
    const checkList = document.getElementById("check-list");

    addBtn.addEventListener("click", e => {
        e.preventDefault();

        const laptopModel = document.getElementById("laptop-model");
        const storage = document.getElementById("storage");
        const price = document.getElementById("price");

        if (laptopModel.value != "" && storage.value != "" && price.value != "") {
            checkList.innerHTML = `
                <li class="laptop-item">
                    <article>
                        <p>${laptopModel.value}</p>
                        <p>Memory: ${storage.value} TB</p>
                        <p>Price: ${price.value}$</p>
                    </article>
                    <button class="btn edit">edit</button>
                    <button class="btn ok">ok</button>
                </li>
            `;

            laptopModel.value = '';
            storage.value = '';
            price.value = '';
            addBtn.disabled = true;
        }
    });
}