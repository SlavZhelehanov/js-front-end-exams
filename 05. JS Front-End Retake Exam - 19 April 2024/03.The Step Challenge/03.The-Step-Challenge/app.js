const API_URL = "http://localhost:3030/jsonstore/records/";

const list = document.getElementById("list");
const loadRrecords = document.getElementById("load-records");
const addRecordBtn = document.getElementById("add-record");
const editRecordBtn = document.getElementById("edit-record");
const name = document.getElementById("p-name");
const steps = document.getElementById("steps");
const calories = document.getElementById("calories");

let tempId;

async function fetchData() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const msg = await response.json();
            throw new Error(msg.message);
        }

        list.innerHTML = '';

        const data = await response.json();

        for (const [id, { calories, name, steps, _id }] of Object.entries(data)) {
            list.innerHTML += `
                <li class="record" id=${_id}>
                    <div class="info">
                        <p>${name}</p>
                        <p>${steps}</p>
                        <p>${calories}</p>
                    </div>
                    <div class="btn-wrapper">
                        <button class="change-btn">Change</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </li>
            `;
        }
    } catch (error) { console.error(error); }
}

loadRrecords.addEventListener("click", fetchData);

addRecordBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (name.value != '' && steps.value != '' && calories.value != '') {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.value, steps: steps.value, calories: calories.value })
            });

            if (!response.ok) {
                const msg = await response.json();
                throw new Error(msg.message);
            }

            name.value = '';
            steps.value = '';
            calories.value = '';
            await fetchData();
        } catch (error) { console.error(error); }
    }
});

list.addEventListener("click", async e => {
    if (e.target.classList.contains("change-btn")) {
        const li = e.target.parentNode.parentNode;

        const [pName, pSteps, pCalories] = li.querySelectorAll(".info>p");

        name.value = pName.textContent;
        steps.value = pSteps.textContent;
        calories.value = pCalories.textContent;
        addRecordBtn.disabled = true;
        editRecordBtn.disabled = false;
        tempId = li.id;
        li.remove();
    } else {

    }
});

editRecordBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (name.value != '' && steps.value != '' && calories.value != '') {
        try {
            const response = await fetch(`${API_URL}${tempId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.value, steps: steps.value, calories: calories.value, _id: tempId })
            });

            if (!response.ok) {
                const msg = await response.json();
                throw new Error(msg.message);
            }

            name.value = '';
            steps.value = '';
            calories.value = '';
            addRecordBtn.disabled = false;
            editRecordBtn.disabled = true;
            await fetchData();
        } catch (error) { console.error(error); }
    }
});