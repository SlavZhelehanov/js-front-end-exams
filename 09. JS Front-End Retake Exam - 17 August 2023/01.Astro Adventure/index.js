function solution(params) {
    const n = +params.shift(), astronauts = {};

    for (let i = 0; i < n; i++) {
        const [name, oxygen, energy] = params.shift().split(" ");

        astronauts[name] = { oxygen: +oxygen, energy: +energy };
    }

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "End") break;

        const [command, name, prm1] = params[i].split(" - ");

        switch (command) {
            case "Explore": {
                if (astronauts[name].energy < +prm1) console.log(`${name} does not have enough energy to explore!`);
                else {
                    astronauts[name].energy -= +prm1;
                    console.log(`${name} has successfully explored a new area and now has ${astronauts[name].energy} energy!`);
                }
                break;
            }
            case "Refuel": {
                let recovered = 0;

                if(200 < astronauts[name].energy + +prm1) {
                    recovered = 200 - astronauts[name].energy;
                    astronauts[name].energy = 200;
                } else {
                    recovered = +prm1;
                    astronauts[name].energy += recovered;
                }
                console.log(`${name} refueled their energy by ${recovered}!`);
                break;
            }
            case "Breathe": {
                let recovered = 0;

                if(100 < astronauts[name].oxygen + +prm1) {
                    recovered = 100 - astronauts[name].oxygen;
                    astronauts[name].oxygen = 100;
                } else {
                    recovered = +prm1;
                    astronauts[name].oxygen += recovered;
                }
                console.log(`${name} took a breath and recovered ${recovered} oxygen!`);
                break;
            }
            default: { break; }
        }
    }

    for (const [name, { oxygen, energy }] of Object.entries(astronauts)) console.log(`Astronaut: ${name}, Oxygen: ${oxygen}, Energy: ${energy}`);
}

solution([  '3',
    'John 50 120',
    'Kate 80 180',
    'Rob 70 150',
    'Explore - John - 50',
    'Refuel - Kate - 30',
    'Breathe - Rob - 20',
    'End']
);
console.log("----------------------------------------------------------");
solution([    '4',
    'Alice 60 100',
    'Bob 40 80',
    'Charlie 70 150',
    'Dave 80 180',
    'Explore - Bob - 60',
    'Refuel - Alice - 30',
    'Breathe - Charlie - 50',
    'Refuel - Dave - 40',
    'Explore - Bob - 40',
    'Breathe - Charlie - 30',
    'Explore - Alice - 40',
    'End']
);