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

    tasksSection.addEventListener('click', e => {
        if(e.target.tagName === 'BUTTON') {
            const article = e.target.parentElement.parentElement;

            let labelTextArr = article.childNodes[1].textContent.split(' ');

            labelTextArr.pop();
            label.value = labelTextArr.join(' ');
            title.value = article.querySelector('.task-card-title').textContent;
            description.value = article.querySelector('.task-card-description').textContent;
            points.value = article.querySelector('.task-card-points').textContent.split(' ')[2];
            assignee.value = article.querySelector('.task-card-assignee').textContent.split(' ')[2];
            article.remove();
            document.getElementById('task-id').value = tasksNumber;
            createTaskBtn.disabled = true;
            deleteTaskBtn.disabled = false;
            label.disabled = true;
            title.disabled = true;
            description.disabled = true;
            points.disabled = true;
            assignee.disabled = true;
        }
    });

    deleteTaskBtn.addEventListener('click', e => {
        e.preventDefault();
        const totalSprintPoints = document.getElementById('total-sprint-points');
        const totalPoints = +totalSprintPoints.textContent.split(' ').filter(x => x.includes('pts'))[0].split('pts')[0] - +points.value;

        totalSprintPoints.innerHTML = "Total Points " + totalPoints + "pts";
        label.disabled = false;
        title.disabled = false;
        description.disabled = false;
        points.disabled = false;
        assignee.disabled = false;
        createTaskBtn.disabled = false;
        deleteTaskBtn.disabled = true;
        label.value = '';
        title.value = '';
        description.value = '';
        points.value = '';
        assignee.value = '';
        document.getElementById('task-id').value = '';
    });
}