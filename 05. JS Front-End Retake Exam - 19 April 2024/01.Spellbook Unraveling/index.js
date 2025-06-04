function solution(params) {
    let spell = params.shift().split('');

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "End") break;

        const [command, prm1, prm2] = params[i].split("!");

        switch (command) {
            case "RemoveEven": {
                let result = [];
                for (let j = spell.length - 1; j >= 0; j--) if (j % 2 === 0) result.unshift(spell[j]);
                spell = [...result];
                console.log(spell.join(''));
                break;
            }
            case "TakePart": {
                let result = [];
                for (let j = +prm1; j < +prm2; j++) result.push(spell[j]);
                spell = [...result];
                console.log(spell.join(''));
                break;
            }
            case "Reverse": {
                if (spell.join('').includes(prm1)) {
                    const newStr = spell.join('').replace(prm1, '');
                    const reversed = prm1.split('').reverse().join('');
                    spell = (newStr + reversed).split('');
                    console.log(spell.join(''));
                } else console.log("Error");             
                break;
            }
            default: { break; }
        }
    }
    console.log(`The concealed spell is: ${spell.join('')}`);    
}

solution(["asAsl2adkda2mdaczsa",
    "RemoveEven",
    "TakePart!1!9",
    "Reverse!maz",
    "End"]);
console.log("-----------------------------------------");
solution(["hZwemtroiui5tfone1haGnanbvcaploL2u2a2n2i2m",
    "TakePart!31!42",
    "RemoveEven",
    "Reverse!anim",
    "Reverse!sad",
    "End"]);