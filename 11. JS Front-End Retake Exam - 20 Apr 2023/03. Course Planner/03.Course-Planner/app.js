const APPI_URL = "http://localhost:3030/jsonstore/tasks/";

const list = document.getElementById("list");
const loadCoursesBtn = document.getElementById("load-course");
const addCourseBtn = document.getElementById("add-course");
const editCourseBtn = document.getElementById("edit-course");
const courseName = document.getElementById("course-name");
const courseType = document.getElementById("course-type");
const courseDescription = document.getElementById("description");
const teacherName = document.getElementById("teacher-name");

let tempId;

async function getCourses() {
    const response = await fetch(APPI_URL);
    const data = await response.json();

    for (const [id, { description, teacher, title, type, _id }] of Object.entries(data)) {
        list.innerHTML += `
        <div class="container" id="${_id}">
            <h2>${title}</h2>
            <h3>${teacher}</h3>
            <h3>${type}</h3>
            <h4>${description}</h4>
            <button class="edit-btn">Edit Course</button>
            <button class="finish-btn">Finish Course</button>
        </div>
        `;
    }
}

loadCoursesBtn.addEventListener("click", getCourses);

addCourseBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (courseName.value !== '' && courseType.value !== '' && courseDescription.value !== '' && teacherName.value !== '') {
        await fetch(APPI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: courseName.value, teacher: teacherName.value, type: courseType.value, description: courseDescription.value })
        });

        courseName.value = '';
        courseType.value = '';
        courseDescription.value = '';
        teacherName.value = '';
        await getCourses();
    }
});

list.addEventListener("click", async e => {
    if (e.target.classList.contains("edit-btn")) {
        const container = e.target.parentNode;
        const [h2Title, h3Teacher, h3Type, h4Description] = container.querySelectorAll("h2, h3, h3, h4");

        courseName.value = h2Title.textContent;
        courseType.value = h3Type.textContent;
        courseDescription.value = h4Description.textContent;
        teacherName.value = h3Teacher.textContent;
        tempId = container.id;
        container.remove();
        addCourseBtn.disabled = true;
        editCourseBtn.disabled = false;
    }
});

editCourseBtn.addEventListener("click", async e => {
    e.preventDefault();

    if (courseName.value !== '' && courseType.value !== '' && courseDescription.value !== '' && teacherName.value !== '') {
        await fetch(`${APPI_URL}${tempId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: courseName.value, teacher: teacherName.value, type: courseType.value, description: courseDescription.value, _id: tempId })
        });

        courseName.value = '';
        courseType.value = '';
        courseDescription.value = '';
        teacherName.value = '';
        addCourseBtn.disabled = false;
        editCourseBtn.disabled = true;
        await getCourses();
    }
});