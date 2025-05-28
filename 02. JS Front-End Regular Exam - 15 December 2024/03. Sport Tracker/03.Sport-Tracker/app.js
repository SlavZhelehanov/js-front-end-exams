const API_URL = "http://localhost:3030/jsonstore/workout/";
const list = document.getElementById("list");
const loadWorkoutBtn = document.getElementById("load-workout");
const addWorkoutBtn = document.getElementById("add-workout");

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

    if (workout.value != '' && location.value != '' && date.value != '') {
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