const API_URL = "http://localhost:3030/jsonstore/appointments/";
const appointmentsList = document.getElementById("appointments-list");
const loadAppointmentsBtn = document.getElementById("load-appointments");
const model = document.getElementById("car-model");
const service = document.getElementById("car-service");
const date = document.getElementById("date");
const addAppointmentBtn = document.getElementById("add-appointment");
const editAppointmentBtn = document.getElementById("edit-appointment");

let tempId;

async function fetchAllAppointments() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const msg = await response.json();
            throw new Error(msg.message);
        }

        const data = await response.json();

        appointmentsList.innerHTML = "";

        for (const [key, { date, model, service, _id }] of Object.entries(data)) {
            appointmentsList.innerHTML += `
            <li class="appointment" id="${_id}">
                <h2>${model}</h2>
                <h3>${date}</h3>
                <h3>${service}</h3>
                <div class="buttons-appointment">
                    <button class="change-btn">Change</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </li>
        `;
        }
    } catch (error) { console.error(error.message); }
}

loadAppointmentsBtn.addEventListener("click", fetchAllAppointments);

addAppointmentBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (model.value != '' && service.value != '' && date.value != '') {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: model.value, date: date.value, service: service.value })
        });

        model.value = '';
        service.value = '';
        date.value = '';

        await fetchAllAppointments();
    }
});

appointmentsList.addEventListener("click", async e => {
    if (e.target.matches(".change-btn")) {
        const li = e.target.closest("li.appointment");

        const carModel = li.querySelector("h2").textContent;
        const [appDate, appService] = li.querySelectorAll("h3");

        model.value = carModel;
        date.value = appDate.textContent;
        service.value = appService.textContent;
        tempId = li.id;
        addAppointmentBtn.disabled = true;
        editAppointmentBtn.disabled = false;
        li.remove();
    } else if (e.target.matches(".delete-btn")) {
        const li = e.target.closest("li.appointment");

        tempId = li.id;
        await fetch(`${API_URL}${tempId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        tempId = '';
        li.remove();
    }
});