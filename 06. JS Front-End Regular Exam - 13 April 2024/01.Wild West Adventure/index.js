function solution(params) {
    const n = +params.shift(), heroes = {};

    for (let i = 0; i < n; i++) {
        const [name, HP, bullets] = params.shift().split(' ');

        heroes[name] = {HP: +HP, bullets: +bullets};
    }

    for (let i = 0; i < params.length; i++) {
        if(params[i] === "Ride Off Into Sunset") break;
        const [command, name, prm1, prm2] = params[i].split(' - ');

        switch (command) {
            case "FireShot": {
                if (0 < heroes[name].bullets) {
                    heroes[name].bullets--;
                    console.log(`${name} has successfully hit ${prm1} and now has ${heroes[name].bullets} bullets!`)
                } else console.log(`${name} doesn't have enough bullets to shoot at ${prm1}!`)
                break;
            }
            case "TakeHit": {
                heroes[name].HP -= +prm1;

                if (heroes[name].HP <= 0) {
                    delete heroes[name];
                    console.log(`${name} was gunned down by ${prm2}!`);
                } else {
                    console.log(`${name} took a hit for ${prm1} HP from ${prm2} and now has ${heroes[name].HP} HP!`);
                }
                break;
            }
            case "Reload": {
                if (heroes[name].bullets === 6) console.log(`${name}'s pistol is fully loaded!`);
                else {
                    console.log(`${name} reloaded ${6 - heroes[name].bullets} bullets!`);
                    heroes[name].bullets = 6;
                }
                break;
            }
            case "PatchUp": {
                if (heroes[name].HP === 100) console.log(`${name} is in full health!`);
                else {
                    const amountRecovered = 100 < heroes[name].HP + +prm1 ? 100 - heroes[name].HP : +prm1;

                    heroes[name].HP = 100 <= heroes[name].HP + +prm1 ? 100 : heroes[name].HP + +prm1
                    console.log(`${name} patched up and recovered ${amountRecovered} HP!`);
                }
                break;
            }
            default: {break;}
        }
    }

    for (const [name, {HP, bullets}] of Object.entries(heroes)) console.log(`${name}
  HP: ${HP}
  Bullets: ${bullets}`);
}

solution(["2",
    "Gus 100 0",
    "Walt 100 6",
    "FireShot - Gus - Bandit",
    "TakeHit - Gus - 100 - Bandit",
    "Reload - Walt",
    "Ride Off Into Sunset"])
console.log("---------------------------------------------------");
solution(["2",
    "Jesse 100 4",
    "Walt 100 5",
    "FireShot - Jesse - Bandit",
    "TakeHit - Walt - 30 - Bandit",
    "PatchUp - Walt - 20" ,
    "Reload - Jesse",
    "Ride Off Into Sunset"]);
console.log("---------------------------------------------------");
solution(["2",
    "Gus 100 4",
    "Walt 100 5",
    "FireShot - Gus - Bandit",
    "TakeHit - Walt - 100 - Bandit",
    "Reload - Gus",
    "Ride Off Into Sunset"]);