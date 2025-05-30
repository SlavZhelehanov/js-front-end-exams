const API_URL = "http://localhost:3030/jsonstore/appointments/";
const appointmentsList = document.getElementById("appointments-list");
const loadAppointmentsBtn = document.getElementById("load-appointments");
const addAppointmentsBtn = document.getElementById("add-appointment");

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

addAppointmentsBtn.addEventListener("click", async e => {
    e.preventDefault();

    const model = document.getElementById("car-model");
    const service = document.getElementById("car-service");
    const date = document.getElementById("date");

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