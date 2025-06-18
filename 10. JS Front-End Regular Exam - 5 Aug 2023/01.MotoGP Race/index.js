function solution(params) {
    const n = +params.shift(), riders = {};

    for (let i = 0; i < n; i++) {
        const [name, fuel, position] = params.shift().split("|");
        riders[name] = { fuel: +fuel, position: +position };
    }

    for (let i = 0; i < params.length; i++) {
        if (params[i] === "Finish") break;
        const [command, rider, prm1, prm2] = params[i].split(" - ");

        switch (command) {
            case "StopForFuel": {
                if (riders[rider].fuel < +prm1) {
                    riders[rider].position = +prm2;
                    console.log(`${rider} stopped to refuel but lost his position, now he is ${prm2}.`);
                }
                else console.log(`${rider} does not need to stop for fuel!`);
                break;
            }
            case "Overtaking": {
                if (riders[rider].position < riders[prm1].position) {
                    riders[prm1].position += riders[rider].position;
                    riders[rider].position = riders[prm1].position - riders[rider].position;
                    riders[prm1].position = riders[prm1].position - riders[rider].position;
                    console.log(`${rider} overtook ${prm1}!`);
                }
                break;
            }
            case "EngineFail": {
                delete riders[rider];
                console.log(`${rider} is out of the race because of a technical issue, ${prm1} laps before the finish.`);
                break;
            }
            default: { break; }
        }
    }

    for (const [rider, { fuel, position }] of Object.entries(riders)) console.log(`${rider}
  Final position: ${position}`);
}

solution(["3",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|2",
    "Jorge Lorenzo|80|3",
    "StopForFuel - Valentino Rossi - 50 - 1",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"])
console.log("--------------------------------------------------------------------------");
solution(["4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish"]);