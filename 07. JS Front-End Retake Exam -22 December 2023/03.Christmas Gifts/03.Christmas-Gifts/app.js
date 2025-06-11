const API_URL = "http://localhost:3030/jsonstore/gifts/";

const giftsList = document.getElementById("gift-list");
const loadPresentsBtn = document.getElementById("load-presents");

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