function solution(params) {
    let astronauts = {};
    const n = +params.shift();

    for (let i = 0; i < n; i++) {
        const [name, section, skills] = params.shift().split(" ");

        astronauts[name] = { section, skills: skills.split(",") };
    }

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "End") break;

        const [command, astrName, somethingNew, skill] = params[i].split(" / ");

        switch (command) {
            case "Perform": {
                if(astronauts[astrName] && astronauts[astrName].section === somethingNew && astronauts[astrName].skills.includes(skill))  console.log(`${astrName} has successfully performed the skill: ${skill}!`);
                else console.log(`${astrName} cannot perform the skill: ${skill}.`);
                break;
            }
            case "Transfer": {
                if (astronauts[astrName]) {
                    astronauts[astrName].section = somethingNew;
                    console.log(`${astrName} has been transferred to: ${somethingNew}`);
                }
                break;
            }
            case "Learn Skill": {
                if (astronauts[astrName] && astronauts[astrName].skills.includes(somethingNew)) console.log(`${astrName} already knows the skill: ${somethingNew}.`);
                else {
                    astronauts[astrName].skills.push(somethingNew);
                    console.log(`${astrName} has learned a new skill: ${somethingNew}.`);
                }
                break;
            }
            default: { break; }
        }
    }

    for (const astr in astronauts) {
        console.log(`Astronaut: ${astr}, Section: ${astronauts[astr].section}, Skills: ${astronauts[astr].skills.sort((a, b) => a.localeCompare(b)).join(", ")}`);
    }
}

solution([
    "2",
    "Alice command_module piloting,communications",
    "Bob engineering_bay repair,maintenance",
    "Perform / Alice / command_module / piloting",
    "Perform / Bob / command_module / repair",
    "Learn Skill / Alice / navigation",
    "Perform / Alice / command_module / navigation",
    "Transfer / Bob / command_module",
    "Perform / Bob / command_module / maintenance",
    "End"
]);
console.log("-----------------------------------------------------------------------------");
solution([
    "3",
    "Tom engineering_bay construction,maintenance",
    "Sara research_lab analysis,sampling",
    "Chris command_module piloting,communications",
    "Perform / Tom / engineering_bay / construction",
    "Learn Skill / Sara / robotics",
    "Perform / Sara / research_lab / robotics",
    "Transfer / Chris / research_lab",
    "Perform / Chris / research_lab / piloting",
    "Learn Skill / Tom / diagnostics",
    "Perform / Tom / engineering_bay / diagnostics",
    "End"
]);