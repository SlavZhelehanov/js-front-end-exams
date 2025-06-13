const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadMealsBtn = document.getElementById("load-meals");
const addMealBtn = document.getElementById("add-meal");
const editMealBtn = document.getElementById("edit-meal");
const food = document.getElementById("food");
const calories = document.getElementById("calories");
const time = document.getElementById("time");
const list = document.getElementById("list");

let tempId;

async function getTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    list.innerHTML = '';
    for (const [id, { food, calories, time, _id }] of Object.entries(data)) {
        list.innerHTML += `<div class="meal" id="${_id}">
              <h2>${food}</h2>
              <h3>${time}</h3>
              <h3>${calories}</h3>
              <div id="meal-buttons">
                <button class="change-meal">Change</button>
                <button class="delete-meal">Delete</button>
              </div>
            </div>`;
    }
}

loadMealsBtn.addEventListener("click", getTasks);

addMealBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (food.value != '' && calories.value != '' && time.value != '') {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ food: food.value, calories: calories.value, time: time.value })
        });

        food.value = '';
        calories.value = '';
        time.value = '';
        await getTasks();
    }
});

list.addEventListener("click", async e => {
    if (e.target.classList.contains("change-meal")) {
        const meal = e.target.parentNode.parentNode;
        const hFood = meal.querySelector("h2");
        const [hTIme, hCalories] = meal.querySelectorAll("h3");

        food.value = hFood.textContent;
        calories.value = hCalories.textContent;
        time.value = hTIme.textContent;
        tempId = meal.id;
        addMealBtn.disabled = true;
        editMealBtn.disabled = false;
        meal.remove();
    } else if (e.target.classList.contains("delete-meal")) {
        const meal = e.target.parentNode.parentNode;

        tempId = meal.id;
        await fetch(`${API_URL}${tempId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        tempId = '';
        await getTasks();
    }
});

editMealBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (food.value != '' && calories.value != '' && time.value != '') {
        await fetch(`${API_URL}${tempId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ food: food.value, calories: calories.value, time: time.value })
        });

        food.value = '';
        calories.value = '';
        time.value = '';
        tempId = '';
        addMealBtn.disabled = false;
        editMealBtn.disabled = true;
        await getTasks();
    }
});