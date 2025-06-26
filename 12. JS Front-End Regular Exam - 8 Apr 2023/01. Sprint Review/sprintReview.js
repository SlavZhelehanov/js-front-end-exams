function sprintReview(params) {
    const n = +params.shift(), tasks = {};
    let todos = 0, inProgress = 0, done = 0, codeReview = 0;

    for (let i = 0; i < n; i++) {
        const [assignee, taskId, title, status, points] = params.shift().split(':');

        if (!tasks[assignee]) tasks[assignee] = [{taskId, title, status, points: + points}];
        else if (!tasks[assignee].some(el => el.taskId === taskId)) tasks[assignee].push({ taskId, title, status, points: +points });
        else tasks[assignee] = tasks[assignee].map(el => el.taskId === taskId ? { taskId, title, status, points: +points } : el);
    }

    for (let i = 0; i < params.length; i++) {
        const [command, assignee, taskId, title, status, points] = params[i].split(':');

        switch (command) {
            case 'Add New': {
                if (!tasks[assignee]) console.log(`Assignee ${assignee} does not exist on the board!`);
                else tasks[assignee].push({ taskId, title, status, points: +points });
                break;
            }
            case 'Change Status': {
                if (!tasks[assignee]) console.log(`Assignee ${assignee} does not exist on the board!`);
                else if (!tasks[assignee].some(el => el.taskId === taskId)) console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
                else tasks[assignee] = tasks[assignee].map(el => el.taskId === taskId ? { taskId: el.taskId, title: el.title, status: title, points: el.points } : el);
                break;
            }
            case 'Remove Task': {
                if (!tasks[assignee]) console.log(`Assignee ${assignee} does not exist on the board!`);
                else if (+taskId < 0 || tasks[assignee].length <= +taskId) console.log(`Index is out of range!`);
                else tasks[assignee] = tasks[assignee].filter((el, index) => index !== +taskId);
                break;
            }
            default: { break; }
        }
    }

    for (const [task,  arr] of Object.entries(tasks)) {
        for (const { taskId, title, status, points } of arr) {
            if (status === "ToDo") todos += points;
            else if (status === "In Progress") inProgress += points;
            else if (status === "Done") done += points;
            else if (status === "Code Review") codeReview += points;
        }
    }

    console.log(`ToDo: ${todos}pts`);
    console.log(`In Progress: ${inProgress}pts`);
    console.log(`Code Review: ${codeReview}pts`);
    console.log(`Done Points: ${done}pts`);
    console.log(`Sprint was ${todos + inProgress + codeReview <= done ? 'successful!' : 'unsuccessful...'}`);
}

sprintReview([
        '5',
        'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
        'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
        'Peter:BOP-1211:POC:Code Review:5',
        'Georgi:BOP-1212:Investigation Task:Done:2',
        'Mariya:BOP-1213:New Account Page:In Progress:13',
        'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
        'Change Status:Peter:BOP-1290:ToDo',
        'Remove Task:Mariya:1',
        'Remove Task:Joro:1',
    ]
);
console.log("---------------------------------------------------------------------------------");
sprintReview([
        '4',
        'Kiril:BOP-1213:Fix Typo:Done:1',
        'Peter:BOP-1214:New Products Page:In Progress:2',
        'Mariya:BOP-1215:Setup Routing:ToDo:8',
        'Georgi:BOP-1216:Add Business Card:Code Review:3',
        'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
        'Change Status:Georgi:BOP-1216:Done',
        'Change Status:Will:BOP-1212:In Progress',
        'Remove Task:Georgi:3',
        'Change Status:Mariya:BOP-1215:Done',
    ]
);