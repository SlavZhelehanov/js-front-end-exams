const API_URL = "http://localhost:3030/jsonstore/tasks/";

const loadMealsBtn = document.getElementById("load-meals");
const addMealBtn = document.getElementById("add-meal");
const editMealBtn = document.getElementById("edit-meal");
const food = document.getElementById("food");
const calories = document.getElementById("calories");
const time = document.getElementById("time");
const list = document.getElementById("list");

async function getTasks() {
    const response = await fetch(API_URL);
    const data = await response.json();

    list.innerHTML = '';
    for (const [id, { food, calories, time, _id }] of Object.entries(data)) {
        list.innerHTML += `<div class="meal">
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