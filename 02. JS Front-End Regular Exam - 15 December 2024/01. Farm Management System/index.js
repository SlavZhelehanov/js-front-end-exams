function solution(params) {
    const n = +params.shift(), workers = {};

    for (let i = 0; i < n; i++) {
        const [name, area, tasks] = params.shift().split(" ");
        workers[name] = { area, tasks: tasks.split(",") };
    }

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "End") break;

        const [command, name, area, task] = params[i].split(" / ");

        switch (command) {
            case "Execute": {
                if (workers[name] && workers[name].area === area && workers[name].tasks.includes(task)) console.log(`${name} has executed the task: ${task}!`);
                else console.log(`${name} cannot execute the task: ${task}.`);
                break;
            }
            case "Change Area": {
                workers[name].area = area;
                console.log(`${name} has changed their work area to: ${area}`);                
                break;
            }
            case "Learn Task": {
                if(workers[name].tasks.includes(area)) console.log(`${name} already knows how to perform ${task}.`);
                else {
                    workers[name].tasks.push(area);
                    console.log(`${name} has learned a new task: ${area}.`);                    
                }
                break;
            }
            default: { break; }
        }
    }

    for (const [name, { area, tasks}] of Object.entries(workers)) console.log(`Farmer: ${name}, Area: ${area}, Tasks: ${tasks.sort((a, b) => a.localeCompare(b)).join(", ")}`);    
}

solution([
    "2",
    "John garden watering,weeding",
    "Mary barn feeding,cleaning",
    "Execute / John / garden / watering",
    "Execute / Mary / garden / feeding",
    "Learn Task / John / planting",
    "Execute / John / garden / planting",
    "Change Area / Mary / garden",
    "Execute / Mary / garden / cleaning",
    "End"
]);
console.log("-----------------------------------------------------------------------");
solution([
    "3",
    "Alex apiary harvesting,honeycomb",
    "Emma barn milking,cleaning",
    "Chris garden planting,weeding",
    "Execute / Alex / apiary / harvesting",
    "Learn Task / Alex / beeswax",
    "Execute / Alex / apiary / beeswax",
    "Change Area / Emma / apiary",
    "Execute / Emma / apiary / milking",
    "Execute / Chris / garden / watering",
    "Learn Task / Chris / pruning",
    "Execute / Chris / garden / pruning",
    "End"
]);