const API_URL = "http://localhost:3030/jsonstore/gifts/";

const giftsList = document.getElementById("gift-list");
const loadPresentsBtn = document.getElementById("load-presents");
const addPresentBtn = document.getElementById("add-present");

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
    const gift = document.getElementById("gift");
    const forWhom = document.getElementById("for");
    const price = document.getElementById("price");

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