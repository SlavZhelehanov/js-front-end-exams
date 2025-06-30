function shoppingList (input) {
    let groceries = input.shift().split("!");

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "Go Shopping!") break;
        const [command, prm1, prm2] = input[i].split(" ");

        switch (command) {
            case "Urgent": {
                if (!groceries.includes(prm1)) groceries.unshift(prm1);
                break;
            }
            case "Unnecessary": {
                if (groceries.includes(prm1)) groceries.splice(groceries.indexOf(prm1), 1);
                break;
            }
            case "Correct": {
                if (groceries.includes(prm1)) groceries[groceries.indexOf(prm1)] = prm2;
                break;
            }
            case "Rearrange": {
                if (groceries.includes(prm1)) {
                    const index = groceries.indexOf(prm1);
                    groceries.splice(index, 1);
                    groceries.push(prm1);
                }
                break;
            }
            default: { break; }
        }
    }
    console.log(groceries.join(", "));
}

shoppingList(["Tomatoes!Potatoes!Bread",
    "Unnecessary Milk",
    "Urgent Tomatoes",
    "Go Shopping!"]);
console.log("---------------------------------------------------------------------------");
shoppingList(["Milk!Pepper!Salt!Water!Banana",
    "Urgent Salt",
    "Unnecessary Grapes",
    "Correct Pepper Onion",
    "Rearrange Grapes",
    "Correct Tomatoes Potatoes",
    "Go Shopping!"]);