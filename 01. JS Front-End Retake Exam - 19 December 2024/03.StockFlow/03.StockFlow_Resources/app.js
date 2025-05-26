const loadOrders = document.getElementById("load-orders");
const orderBtn = document.getElementById("order-btn");
const editOrder = document.getElementById("edit-order");

const list = document.getElementById("list");

let tmpId;

async function getData() {
    const response = await fetch("http://localhost:3030/jsonstore/orders");

    if (!response.ok) {
        const errMsg = await response.json();
        throw new Error(errMsg.message);
    }

    return response.json();
}

loadOrders.addEventListener("click", async () => {
    const data = await getData();

    for (const order in data) {
        list.innerHTML += `
        <div class="container" id="${data[order]._id}">
            <h2>${data[order].name}</h2>
            <h3>${data[order].date}</h3>
            <h3>${data[order].quantity}</h3>
            <button class="change-btn">Change</button>
            <button class="done-btn">Done</button>
        </div>
        `;
    }
});
