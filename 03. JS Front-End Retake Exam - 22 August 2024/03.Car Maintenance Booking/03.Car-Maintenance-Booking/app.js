const API_URL = "http://localhost:3030/jsonstore/appointments/";
const appointmentsList = document.getElementById("appointments-list");
const loadAppointmentsBtn = document.getElementById("load-appointments");

async function fetchAllAppointments() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const msg = await response.json();
            throw new Error(msg.message);
        }

        const data = await response.json();

        for (const [key, { date, model, service }] of Object.entries(data)) {
            appointmentsList.innerHTML += `
            <li class="appointment">
                <h2>${model}</h2>
                <h3>${date}</h3>
                <h3>${service}</h3>
            </li>
        `;
        }
    } catch (error) {
        console.error(error.message);        
    }
}

loadAppointmentsBtn.addEventListener("click", fetchAllAppointments);