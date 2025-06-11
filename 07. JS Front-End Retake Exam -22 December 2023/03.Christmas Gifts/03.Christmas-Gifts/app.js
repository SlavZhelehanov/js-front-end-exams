const API_URL = "http://localhost:3030/jsonstore/gifts/";

const giftsList = document.getElementById("gift-list");
const loadPresentsBtn = document.getElementById("load-presents");
const addPresentBtn = document.getElementById("add-present");
const editPresentBtn = document.getElementById("edit-present");
const gift = document.getElementById("gift");
const forWhom = document.getElementById("for");
const price = document.getElementById("price");

let tempId;

async function getGifts() {
    const response = await fetch(API_URL);
    const data = await response.json();

    giftsList.innerHTML = '';
    for (const [id, { for: forWhom, gift, price, _id }] of Object.entries(data)) {
        giftsList.innerHTML += `
        <div class="gift-sock" id="${_id}">
            <div class="content">
                <p>${gift}</p>
                <p>${forWhom}</p>
                <p>${price}</p>
            </div>
            <div class="buttons-container">
                <button class="change-btn">Change</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
        `;
    }
}

loadPresentsBtn.addEventListener("click", getGifts);

addPresentBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (gift.value !== '' && forWhom.value !== '' && price.value !== '') {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gift: gift.value, for: forWhom.value, price: price.value })
        });
        gift.value = '';
        forWhom.value = '';
        price.value = '';
        await getGifts();
    }
});

giftsList.addEventListener("click", async e => {
    if (e.target.classList.contains("change-btn")) {
        const li = e.target.parentNode.parentNode;
        const [pGift, pFor, pPrice] = li.querySelectorAll(".content>p");

        gift.value = pGift.textContent;
        forWhom.value = pFor.textContent;
        price.value = pPrice.textContent;
        tempId = li.id;
        li.remove();
        addPresentBtn.disabled = true;
        editPresentBtn.disabled = false;
    } else if (e.target.classList.contains("delete-btn")) {
        const li = e.target.parentNode.parentNode;
        tempId = li.id;
        await fetch(`${API_URL}${tempId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        tempId = '';
        await getGifts();
    }
});

editPresentBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (gift.value !== '' && forWhom.value !== '' && price.value !== '') {
        await fetch(`${API_URL}${tempId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gift: gift.value, for: forWhom.value, price: price.value, _id: tempId })
        });
        gift.value = '';
        forWhom.value = '';
        price.value = '';
        await getGifts();
        tempId = '';
        addPresentBtn.disabled = false;
        editPresentBtn.disabled = true;
    }
});