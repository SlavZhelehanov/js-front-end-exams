window.addEventListener("load", solve);

function solve() {
    const addBtn = document.getElementById("add-btn");
    const checkList = document.getElementById("check-list");
    const laptopsList = document.getElementById("laptops-list");

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

    checkList.addEventListener("click", e => {
        if ([...e.target.classList].includes("edit")) {
            const article = document.querySelectorAll(".laptop-item>article>p");
            const laptopModel = document.getElementById("laptop-model");
            const storage = document.getElementById("storage");
            const price = document.getElementById("price");
            const [oldModel, oldStorage, oldPrice] = [article[0].textContent, article[1].textContent, article[2].textContent];

            laptopModel.value = oldModel;
            storage.value = +oldStorage.split(" ")[1];
            price.value = +oldPrice.split(" ")[1].split("$")[0];
            addBtn.disabled = false;
            checkList.innerHTML = '';
        } else if ([...e.target.classList].includes("ok")){
            const article = document.querySelectorAll(".laptop-item>article>p");
            const [model, storage, price] = [article[0].textContent, article[1].textContent, article[2].textContent];

            laptopsList.innerHTML += `
                <li class="laptop-item">
                    <article>
                        <p>${model}</p>
                        <p>Memory: ${storage.split(" ")[1]} TB</p>
                        <p>Price: ${price.split(" ")[1].split("$")[0]}$</p>
                    </article>
                </li>
            `;
            
            addBtn.disabled = false;
            checkList.innerHTML = '';
        }
    });
}