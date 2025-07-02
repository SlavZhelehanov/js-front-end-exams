function thePianist(arr) {
    const n = +arr.shift(), pieces = {};

    for (let i = 0; i < n; i++) {
        const [piece, composer, key] = arr.shift().split("|");

        if (!pieces[piece]) pieces[piece] = { composer, key };
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "Stop") break;
        const [command, piece, prm1, prm2] = arr[i].split("|");

        switch (command) {
            case "Add": {
                if (pieces[piece]) console.log(`${piece} is already in the collection!`);
                else {
                    pieces[piece] = { composer: prm1, key: prm2 };
                    console.log(`${piece} by ${prm1} in ${prm2} added to the collection!`)
                }
                break;
            }
            case "Remove": {
                if (!pieces[piece]) console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                else {
                    delete pieces[piece];
                    console.log(`Successfully removed ${piece}!`);
                }
                break;
            }
            case "ChangeKey": {
                if (!pieces[piece]) console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                else {
                    pieces[piece].key = prm1;
                    console.log(`Changed the key of ${piece} to ${prm1}!`);
                }
                break;
            }
            default: { break; }
        }
    }

    for (const [piece, {composer, key}] of Object.entries(pieces)) console.log(`${piece} -> Composer: ${composer}, Key: ${key}`);
}

thePianist([
        '3',
        'Fur Elise|Beethoven|A Minor',
        'Moonlight Sonata|Beethoven|C# Minor',
        'Clair de Lune|Debussy|C# Minor',
        'Add|Sonata No.2|Chopin|B Minor',
        'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
        'Add|Fur Elise|Beethoven|C# Minor',
        'Remove|Clair de Lune',
        'ChangeKey|Moonlight Sonata|C# Major',
        'Stop'
    ]
);
console.log("-----------------------------------------------------");
thePianist([
        '4',
        'Eine kleine Nachtmusik|Mozart|G Major',
        'La Campanella|Liszt|G# Minor',
        'The Marriage of Figaro|Mozart|G Major',
        'Hungarian Dance No.5|Brahms|G Minor',
        'Add|Spring|Vivaldi|E Major',
        'Remove|The Marriage of Figaro',
        'Remove|Turkish March',
        'ChangeKey|Spring|C Major',
        'Add|Nocturne|Chopin|C# Minor',
        'Stop'
    ]
);