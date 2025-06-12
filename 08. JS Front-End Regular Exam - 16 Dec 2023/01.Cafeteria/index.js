function solution(input) {
    const n = +input.shift(), baristas = {};

    for (let i = 0; i < n; i++) {
        const [name, shift, drinks] = input.shift().split(' ');
        baristas[name] = { shift, drinks: drinks.split(',') };
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i] === 'Closed') break;

        const [command, name, prm1, prm2] = input[i].split(' / ');

        switch (command) {
            case 'Prepare': {
                if (baristas[name] && baristas[name].shift === prm1 && baristas[name].drinks.includes(prm2)) {
                    console.log(`${name} has prepared a ${prm2} for you!`);
                } else {
                    console.log(`${name} is not available to prepare a ${prm2}.`);
                }
                break;
            }
            case 'Change Shift': {
                baristas[name].shift = prm1;
                console.log(`${name} has updated his shift to: ${prm1}`);
                break;
            }
            case 'Learn': {
                if (baristas[name] && baristas[name].drinks.includes(prm1)) {
                    console.log(`${name} knows how to make ${prm1}.`);
                } else {
                    baristas[name].drinks.push(prm1);
                    console.log(`${name} has learned a new coffee type: ${prm1}.`);
                }
                break;
            }
            default: { break; }
        }
    }

    for (const [name, { shift, drinks }] of Object.entries(baristas)) console.log(`Barista: ${name}, Shift: ${shift}, Drinks: ${drinks.join(', ')}`);
}

solution([
    '3',
    'Alice day Espresso,Cappuccino',
    'Bob night Latte,Mocha',
    'Carol day Americano,Mocha',
    'Prepare / Alice / day / Espresso',
    'Change Shift / Bob / night',
    'Learn / Carol / Latte',
    'Learn / Bob / Latte',
    'Prepare / Bob / night / Latte',
    'Closed']
);

console.log("--------------------------------------------------------------");

solution([
    '3',
    'Alice day Espresso,Cappuccino',
    'Bob night Latte,Mocha',
    'Carol day Americano,Mocha',
    'Prepare / Alice / day / Espresso',
    'Change Shift / Bob / night',
]);

console.log("--------------------------------------------------------------");

solution(['4',
    'Alice day Espresso,Cappuccino',
    'Bob night Latte,Mocha',
    'Carol day Americano,Mocha',
    'David night Espresso',
    'Prepare / Alice / day / Espresso',
    'Change Shift / Bob / day',
    'Learn / Carol / Latte',
    'Prepare / Bob / night / Latte',
    'Learn / David / Cappuccino',
    'Prepare / Carol / day / Cappuccino',
    'Change Shift / Alice / night',
    'Learn / Bob / Mocha',
    'Prepare / David / night / Espresso',
    'Closed']
);