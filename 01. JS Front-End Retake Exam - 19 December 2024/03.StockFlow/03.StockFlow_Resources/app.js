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
orderBtn.addEventListener("click", async e => {
    e.preventDefault();

    const name = document.getElementById("name");
    const date = document.getElementById("date");
    const quantity = document.getElementById("quantity");

    if (name.value != '' && date.value != '' && quantity.value != '') {
        const postReuiest = await fetch("http://localhost:3030/jsonstore/orders", {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.value, date: date.value, quantity: quantity.value })
        });

        if (!postReuiest.ok) {
            const errMsg = await postReuiest.json();
            throw new Error(errMsg.message);
        }

        name.value = '';
        date.value = '';
        quantity.value = '';

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
    }
});
list.addEventListener("click", e => {
    if (e.target.className === "change-btn") {
        const container = e.target.parentElement;
        const name = document.getElementById("name");
        const date = document.getElementById("date");
        const quantity = document.getElementById("quantity");
        const h2Name = container.querySelector("h2").textContent;
        const h3Date = container.querySelector("h3:nth-child(2)").textContent;
        const h3Quantity = container.querySelector("h3:nth-child(3)").textContent;

        tmpId = container.id;
        name.value = h2Name;
        date.value = h3Date;
        quantity.value = h3Quantity;
        orderBtn.disabled = true;
        editOrder.disabled = false;
        container.remove();
    } else if (e.target.className === "done-btn") {
        e.target.parentElement.remove();
    }
});
