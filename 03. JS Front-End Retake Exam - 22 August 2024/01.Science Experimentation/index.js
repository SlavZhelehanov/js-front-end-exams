function solution(params) {
    const n = +params.shift(), chemicals = {};

    for (let i = 0; i < n; i++) {
        const [name, quantity] = params.shift().split(" # ");
        chemicals[name] = { quantity: +quantity };
    }

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "End") break;

        const [command, name, prm1, prm2] = params[i].split(" # ");

        switch (command) {
            case "Mix": {
                if (chemicals[name].quantity < +prm2 || chemicals[prm1].quantity < +prm2) console.log(`Insufficient quantity of ${name}/${prm1} to mix.`);
                else if (+prm2 < chemicals[prm1].quantity && +prm2 < chemicals[name].quantity) {
                    chemicals[name].quantity -= +prm2;
                    chemicals[prm1].quantity -= +prm2;
                    console.log(`${name} and ${prm1} have been mixed. ${prm2} units of each were used.`);
                }
                break;
            }
            case "Replenish": {
                if (!chemicals[name]) console.log(`The Chemical ${name} is not available in the lab.`);
                else if (500 < chemicals[name].quantity + +prm1) {
                    const addedAmount = 500 - chemicals[name].quantity;

                    chemicals[name].quantity = 500;
                    console.log(`${name} quantity increased by ${addedAmount} units, reaching maximum capacity of 500 units!`);
                } else {
                    chemicals[name].quantity += +prm1;
                    console.log(`${name} quantity increased by ${prm1} units!`);
                }
                break;
            }
            case "Add Formula": {
                if (!chemicals[name]) console.log(`The Chemical ${name} is not available in the lab.`);
                else {
                    chemicals[name].formula = prm1;
                    console.log(`${name} has been assigned the formula ${prm1}.`);
                }
                break;
            }
            default: { break; }
        }
    }

    for (const [name, { quantity, formula }] of Object.entries(chemicals)) console.log(`Chemical: ${name}, Quantity: ${quantity}${formula ? ", Formula: " + formula : ""}`);
}

solution(['4',
    'Water # 200',
    'Salt # 100',
    'Acid # 50',
    'Base # 80',
    'Mix # Water # Salt # 50',
    'Replenish # Salt # 150',
    'Add Formula # Acid # H2SO4',
    'End']);
console.log("----------------------------------------------------------------------------");
solution(['3',
    'Sodium # 300',
    'Chlorine # 100',
    'Hydrogen # 200',
    'Mix # Sodium # Chlorine # 200',
    'Replenish # Sodium # 250',
    'Add Formula # Sulfuric Acid # H2SO4',
    'Add Formula # Sodium # Na',
    'Mix # Hydrogen # Chlorine # 50',
    'End']);