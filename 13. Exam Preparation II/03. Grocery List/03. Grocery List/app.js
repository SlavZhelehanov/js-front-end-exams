const API_URL = "http://localhost:3030/jsonstore/grocery/";

const loadProductsBtn = document.getElementById("load-product");
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