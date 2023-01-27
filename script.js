function initialize()
{
    diceTable = document.getElementById("dicetable");
    diceToRoll = document.getElementById("diceToRoll")
    TimesToRollDiceOutput = document.getElementById("timesRoll");
}

function rollDice()
{
    let totals = []; // empty array to store totals
    diceToRoll = parseInt(document.getElementById("diceToRoll").value); // takes in integer value from form which determines if 1, 2, or 3 dice is rolled
    // console.log(diceToRoll); check
    timesRoll = parseInt(document.getElementById("timesRoll").value); // takes in integer value for how many times the dice are rolled
    // console.log(timesRoll); check
    result = [];
    doubles = 0;
    triples = 0;
    for (let i = 0; i < timesRoll; i++)
    {
        result.push(roll(diceToRoll)); // push appends into array
    }

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

    dicetable = document.getElementById("dicetable"); // get dicetable from HTML
    
    for (let i = 0; i < timesRoll; i++)
    {
        dieRoll = result[i];
        var newRow = diceTable.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = dieRoll;
        newCell = newRow.insertCell();
        newCell.innerHTML = largestFrequency;
        newCell = newRow.insertCell();
        newCell.innerHTML = mean(result);
        newCell = newRow.insertCell();
        newCell.innerHTML = median(result);
        newCell = newRow.insertCell();
        newCell.innerHTML = mode;
        if(diceToRoll >= 2)
        {
            newCell = newRow.insertCell();
            newCell.innerHTML = doubles;
        }
        else
        {
            newCell = newRow.insertCell();
            newCell.innerHTML = 0;
        }

        if(diceToRoll == 3)
        {
            newCell = newRow.insertCell();
            newCell.innerHTML = triples;
        }
        else
        {
            newCell = newRow.insertCell();
            newCell.innerHTML = 0;
        }
    }
}

function frequency(result, numsRolled) // checks how many times one result has appeared 
{
    count = 0;
    // console.log(result); check
    // console.log(numsRolled); check
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
    let rolledNums = [];
    for (let i = 0; i < numDice; i++) 
    {
        let v = getRandomInteger(1, 6);
        rolledNums.push(v);
        sum += v;
    }
    if (numDice == 2) { // checks for doubles in current roll if two dice are rolled
        if (rolledNums[0] == rolledNums[1]) {
            doubles++;
        }
    }
    if (numDice == 3) { // checks for doubles and triples in current roll if three dce are rolled
        if (rolledNums[0] == rolledNums[1]) {
            doubles++;
        }
        if (rolledNums[0] == rolledNums[1] && rolledNums[1] == rolledNums[2]) {
            triples++;
        }
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
    // Math.floor is if the number is odd because you have to divide the number in half
}

function getRandomInteger(lower, upper) // like Math.random()
{
    var multiplier = upper - (lower - 1);
    var rnd = parseInt(Math.random() * multiplier) + lower;
    return rnd;
}
