window.addEventListener('load', solve);

function solve() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const label = document.getElementById('label');
    const points = document.getElementById('points');
    const assignee = document.getElementById('assignee');
    const createTaskBtn = document.getElementById('create-task-btn');
    const deleteTaskBtn = document.getElementById('delete-task-btn');
    const tasksSection = document.getElementById('tasks-section');

    let tasksNumber = 0

    createTaskBtn.addEventListener('click', e => {
        e.preventDefault();

        if(title.value !== '' && description.value !== '' && label.value !== '' && points.value !== '' && assignee.value !== '') {
            const totalSprintPoints = document.getElementById('total-sprint-points');
            let taskLabelClass, taskLabelIcon, totalPoints = +totalSprintPoints.textContent.split(' ').filter(x => x.includes('pts'))[0].split('pts')[0] + +points.value;

            if ("Feature" === label.value) {
                taskLabelClass = "feature";
                taskLabelIcon = "&#8865";
            } else if  ("Low Priority Bug" === label.value) {
               taskLabelClass = "low-priority";
               taskLabelIcon = "&#9737";
            } else {
                taskLabelClass = "high-priority";
                taskLabelIcon = "&#9888";
            }

            totalSprintPoints.innerHTML = "Total Points " + totalPoints + "pts";
            console.log(totalSprintPoints.textContent)
            tasksNumber++;
            tasksSection.innerHTML += `
            <article id="task-${tasksNumber}" class="task-card">
                <div class="task-card-label ${taskLabelClass}">${label.value} ${taskLabelIcon}</div>
                <h3 class="task-card-title">${title.value}</h3>
                <p class="task-card-description">${description.value}</p>
                <div class="task-card-points">Estimated at ${points.value} pts</div>
                <div class="task-card-assignee">Assigned to: ${assignee.value}</div>
                <div class="task-card-actions">
                    <button>Delete</button>
                </div>
            </article>`;

            title.value = '';
            description.value = '';
            label.value = '';
            points.value = '';
            assignee.value = '';
        }
    });
}