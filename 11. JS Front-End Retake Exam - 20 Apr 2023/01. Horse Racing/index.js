function horseRacing(params) {
    let horses = params.shift().split('|');

    // console.log(horses.join('->'));

    for (let i = 0; i < params.length; i++) {
        if (params[i] === 'Finish') break;
        const [command, prm1, prm2] = params[i].split(' ');

        switch (command) {
            case 'Retake': {
                if (horses.indexOf(prm1) < horses.indexOf(prm2)) {
                    const idx1 = horses.indexOf(prm1), idx2 = horses.indexOf(prm2);
                    horses[idx1] = prm2;
                    horses[idx2] = prm1;
                    console.log(`${prm1} retakes ${prm2}.`);
                }
                break;
            }
            case 'Trouble': {
                if (0 < horses.indexOf(prm1)) {
                    const tmp = horses[horses.indexOf(prm1) - 1], idx = horses.indexOf(prm1) - 1;
                    horses[idx] = prm1;
                    horses[idx + 1] = tmp;
                    console.log(`Trouble for ${prm1} - drops one position.`);
                }
                break;
            }
            case 'Rage': {
                if (horses.indexOf(prm1) < horses.length - 1) {
                    for (let j = 0; j < 2; j++) {
                        if (horses.indexOf(prm1) < horses.length - 1) {
                            const tmp = horses[horses.indexOf(prm1) + 1], idx = horses.indexOf(prm1) + 1;
                            horses[idx] = prm1;
                            horses[idx - 1] = tmp;
                        }
                    }
                }
                console.log(`${prm1} rages 2 positions ahead.`);
                break;
            }
            case 'Miracle': {
                const tmp = horses.shift();

                horses.push(tmp);
                console.log(`What a miracle - ${tmp} becomes first.`);
                break;
            }
            default: { break; }
        }
    }

    console.log(horses.join('->'));
    console.log(`The winner is: ${horses.pop()}`);
}

horseRacing(['Bella|Alexia|Sugar',
    'Retake Alexia Sugar',
    'Rage Bella',
    'Trouble Bella',
    'Finish']);
console.log("----------------------------------------------");
horseRacing(['Onyx|Domino|Sugar|Fiona',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish']);
console.log("----------------------------------------------");
horseRacing(['Fancy|Lilly',
    'Retake Lilly Fancy',
    'Trouble Lilly',
    'Trouble Lilly',
    'Finish',
    'Rage Lilly']);