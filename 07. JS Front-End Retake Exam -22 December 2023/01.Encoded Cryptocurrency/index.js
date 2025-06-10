function solve(params) {
    let encoded = params.shift();

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "Buy") break;
        let [command, prm1, prm2] = params[i].split("?");

        switch (command) {
            case "TakeEven": {
                const result = [];
                for (let j = encoded.length - 1; j >= 0; j--) if (j % 2 === 0) result.unshift(encoded[j]);
                encoded = result.join('');
                console.log(encoded);
                break;
            }
            case "Reverse": {
                if (encoded.includes(prm1)) {
                    encoded = encoded.replace(prm1, '');
                    prm1 = prm1.split('').reverse().join('');
                    encoded += prm1;
                    console.log(encoded);
                } else console.log("error");
                break;
            }
            case "ChangeAll": {
                while (encoded.includes(prm1)) encoded = encoded.replace(prm1, prm2);
                console.log(encoded);
                break;
            }
            default: { break; }
        }
    }
    console.log(`The cryptocurrency is: ${encoded}`)
}

solve(["z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs",
    "TakeEven",
    "Reverse?!nzahc",
    "ChangeAll?m?g",
    "Reverse?adshk",
    "ChangeAll?z?i",
    "Buy"])
console.log("------------------------------------------------------------");
solve(["PZDfA2PkAsakhnefZ7aZ",
    "TakeEven",
    "TakeEven",
    "TakeEven",
    "ChangeAll?Z?X",
    "ChangeAll?A?R",
    "Reverse?PRX",
    "Buy"]);