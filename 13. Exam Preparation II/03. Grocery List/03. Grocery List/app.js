const API_URL = "http://localhost:3030/jsonstore/grocery/";

const loadProductsBtn = document.getElementById("load-product");
const addProduct = document.getElementById("add-product");
const inputProduct = document.getElementById("product");
const inputPrice = document.getElementById("price");
const inputCount = document.getElementById("count");
const tbody = document.getElementById("tbody");

async function fetchData() {
    const response = await fetch(API_URL);
    const data = await response.json();

    tbody.innerHTML = "";
    for (const [item, {product, count, price, _id}] of Object.entries(data)) {
        tbody.innerHTML += `<tr id="${_id}"><td class="name">${product}</td><td class="count-product">${count}</td><td class="product-price">${price}</td><td class="btn"><button class="update">Update</button><button class="delete">Delete</button></td></tr>`;
    }
}

loadProductsBtn.addEventListener("click", e => {
    e.preventDefault();
    fetchData();
});

addProduct.addEventListener("click", async e => {
    e.preventDefault();

    if (inputProduct.value !== "" && inputPrice.value !== "" && inputCount.value !== "") {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({product: inputProduct.value, count: inputCount.value, price: inputPrice.value})
        });

        inputProduct.value = "";
        inputPrice.value = "";
        inputCount.value = "";
        fetchData();
    }
});