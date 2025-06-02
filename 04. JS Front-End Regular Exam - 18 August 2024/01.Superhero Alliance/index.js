function solution(params) {
    const n = +params.shift(), supers = {};

    for (let i = 0; i < n; i++) {
        const [name, powers, energy] = params.shift().split("-");

        supers[name] = { powers: powers.split(","), energy: +energy };
    }

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "Evil Defeated!") break;
        const [command, name, prm1, prm2] = params[i].split(" * ");

        switch (command) {
            case "Use Power": {
                if (!supers[name].powers.includes(prm1) || supers[name].energy - +prm2 < 0) console.log(`${name} is unable to use ${prm1} or lacks energy!`);
                else {
                    supers[name].energy -= +prm2;
                    console.log(`${name} has used ${prm1} and now has ${supers[name].energy} energy!`);
                }
                break;
            }
            case "Train": {
                if (supers[name].energy === 100) console.log(`${name} is already at full energy!`);
                else {
                    const energyGained = supers[name].energy + +prm1 <= 100 ? +prm1 : 100 - supers[name].energy;

                    supers[name].energy = supers[name].energy + +prm1 <= 100 ? supers[name].energy + +prm1 : 100;
                    console.log(`${name} has trained and gained ${energyGained} energy!`);
                }
                break;
            }
            case "Learn": {
                if (supers[name].powers.includes(prm1)) console.log(`${name} already knows ${prm1}.`);
                else {
                    supers[name].powers.push(prm1);
                    console.log(`${name} has learned ${prm1}!`);
                }
                break;
            }
            default: { break; }
        }
    }

    for (const [name, { powers, energy }] of Object.entries(supers)) console.log(`Superhero: ${name}
 - Superpowers: ${powers.join(", ")}
 - Energy: ${energy}`);
}

solution([
    "3",
    "Iron Man-Repulsor Beams,Flight-80",
    "Thor-Lightning Strike,Hammer Throw-10",
    "Hulk-Super Strength-60",
    "Use Power * Iron Man * Flight * 30",
    "Train * Thor * 20",
    "Train * Hulk * 50",
    "Learn * Hulk * Thunderclap",
    "Use Power * Hulk * Thunderclap * 70",
    "Evil Defeated!"
]);
console.log("-------------------------------------------------------------");
solution([
    "2",
    "Iron Man-Repulsor Beams,Flight-20",
    "Thor-Lightning Strike,Hammer Throw-100",
    "Train * Thor * 20",
    "Use Power * Iron Man * Repulsor Beams * 30",
    "Evil Defeated!"
]);
console.log("-------------------------------------------------------------");
solution([
    "2",
    "Iron Man-Repulsor Beams,Flight-100",
    "Thor-Lightning Strike,Hammer Throw-50",
    "Train * Thor * 20",
    "Learn * Thor * Hammer Throw",
    "Use Power * Iron Man * Repulsor Beams * 30",
    "Evil Defeated!"
]);