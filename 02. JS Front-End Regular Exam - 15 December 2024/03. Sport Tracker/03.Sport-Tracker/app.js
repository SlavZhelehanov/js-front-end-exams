const API_URL = "http://localhost:3030/jsonstore/workout/";
const list = document.getElementById("list");
const loadWorkoutBtn = document.getElementById("load-workout");
const addWorkoutBtn = document.getElementById("add-workout");
const editWorkoutBtn = document.getElementById("edit-workout");

let tmpId;

async function getWorkouts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const msg = await response.json();
            throw new Error(msg.message);
        }

        const data = await response.json();

        list.innerHTML = '';

        for (const key in data) {
            list.innerHTML += `
            <div class="container" id="${data[key]._id}">
                <h2>${data[key].workout}</h2>
                <h3>${data[key].date}</h3>
                <h3 id="location">${data[key].location}</h3>
                <div id="buttons-container">
                    <button class="change-btn">Change</button>
                    <button class="delete-btn">Done</button>
                </div>
            </div>
        `;
        }
    } catch (error) {
        return console.error(error);
    }
}

loadWorkoutBtn.addEventListener("click", getWorkouts);

addWorkoutBtn.addEventListener("click", async e => {
    e.preventDefault();

    const workout = document.getElementById("workout");
    const location = document.getElementById("location");
    const date = document.getElementById("date");

    if (workout.value !== '' && location.value !== '' && date.value !== '') {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workout: workout.value, location: location.value, date: date.value })
        });

        workout.value = '';
        location.value = '';
        date.value = '';

        await getWorkouts();
    }
});

list.addEventListener("click", async e => {
    if (e.target.className === "change-btn") {
        const container = e.target.parentElement.parentElement;
        const workout = document.getElementById("workout");
        const date = document.getElementById("date");
        const location = document.getElementById("location");
        const h2Workout = container.querySelector("h2").textContent;
        const h3Date = container.querySelector("h3:nth-child(2)").textContent;
        const h3Location = container.querySelector("h3:nth-child(3)").textContent;

        tmpId = container.id;
        workout.value = h2Workout;
        date.value = h3Date;
        location.value = h3Location;
        addWorkoutBtn.disabled = true;
        editWorkoutBtn.disabled = false;
        container.remove();
    } else if (e.target.className === "delete-btn") {
        const container = e.target.parentElement.parentElement;

        tmpId = container.id;

        const deleteRequest = await fetch(`${API_URL}${tmpId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        e.target.parentElement.remove();
        await getWorkouts();
    }
});

editWorkoutBtn.addEventListener("click", async e => {
    e.preventDefault();
    const workout = document.getElementById("workout");
    const location = document.getElementById("location");
    const date = document.getElementById("date");

    if (workout.value !== '' && date.value !== '' && location.value !== '') {
        await fetch(`${API_URL}${tmpId}`, {
            method: "PUT",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ workout: workout.value, date: date.value, location: location.value, _id: tmpId })
        });

        workout.value = '';
        date.value = '';
        location.value = '';
        addWorkoutBtn.disabled = false;
        editWorkoutBtn.disabled = true;

        await getWorkouts();
    }
});