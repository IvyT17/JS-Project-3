function initialize()
{
    diceTable = document.getElementById("dicetable");
    diceToRoll = document.getElementById("diceToRoll")
    /*rollDice();
    button = document.createElement("button");
    button.innerHTML = "Roll Dice";
    button.addEventListener("click", rollDice);
    document.body.appendChild(button);
    inputContainer = document.getElementById("inputform");
    DiceToRollOutput = document.getElementById("diceToRoll"); */
    TimesToRollDiceOutput = document.getElementById("timesRoll");
}

function rollDice()
{
    let totals = []; // empty array to store totals
    diceToRoll = parseInt(document.getElementById("diceToRoll").value); // takes in integer value from form which determines if 1, 2, or 3 dice is rolled
    // console.log(diceToRoll); check

    if(diceToRoll == 1) // 1 die = totals can only be 1-6
    {
        totals = [1, 2, 3, 4, 5, 6];
    }
    else if(diceToRoll == 2) // 2 dice = totals can only be 2-12
    {
        totals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    else // 3 dice = totals can only be 3-18
    {
        totals = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    }

    timesRoll = parseInt(document.getElementById("timesRoll").value); // takes in integer value for how many times the dice are rolled
    // console.log(timesRoll); check

    let allSums = []; // empty array for all the totals of all the times rolled
    for (let i = 0; i < timesRoll; i++)
    {
        allSums.push(roll(diceToRoll)); // push appends into array
    }

    frequencies = []; // empty array for frequency of each total
    for (let i of totals)
    {
        frequencies.push(frequency(i, allSums));
    }

    mode = 0;
    largestFrequency = 0;

    for(let i of totals)
    {
        freq = frequency(i, allSums);
        // console.log(freq);
        if(freq > largestFrequency)
        {
            largestFrequency = freq;
            mode = i;
        }
    }

    // console.log(mode);
    // console.log(frequencies);
    // console.log(mean(allSums));
    /*
    var numRolls = getRandomInteger(25, 100);
    
    for (var i = 0; i < numRolls; i++)
    {
        var dieRoll = getRandomInteger(1, 6);

        var newRow = diceTable.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = "Roll " + (i + 1);

        newCell = newRow.insertCell();
        newCell.innerHTML = dieRoll;
    }
    
    DiceToRoll = inputContainer.dicenum.value;
    TimesToRollDice = inputContainer.timesroll.value;

    inputContainer.dicenum.value = "";
    inputContainer.timesroll.value = "";
    display(); */
}

function frequency(result, numsRolled) // checks how many times one result has appeared 
{
    count = 0;
    // console.log(result);
    // console.log(numsRolled);
    for (let num of numsRolled)
    {
        if (num == result)
        {
            count++;
        }
    }
    return count;
}

function roll(numDice)
{
    let sum = 0;
    for (let i = 0; i < numDice; i++) 
    {
        sum += getRandomInteger(1, 6);
    }
    return sum;
}

function mean(numsRolled)
{
    sum = 0;
    for (i of numsRolled)
    {
        sum += i;
    }
    return sum/numsRolled.length;
}

function median(sums)
{
    return sums.sort()[Math.floor(sums.length / 2)]; // first sort through the array so it's lowest to highest value
    // Math.floor is if the number is odd because you have to remove the decimal since there are only whole numbers on the dice
}

function getRandomInteger(lower, upper) // like Math.random()
{
    var multiplier = upper - (lower - 1);
    var rnd = parseInt(Math.random() * multiplier) + lower;
    return rnd;
}

function display()
{
    numberOutput.innerHTML = number;
    diceToRoll.innerHTML = getRandomInteger(1, 3);
}
/* random = [3, 8, 3];
sum = 0;
for(i of random)
{
    sum += i;
}
console.log(sum/random.length); */