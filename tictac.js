const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartbtn = document.querySelector("#restart");
const winCond = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];


let options = ["", "", "", "", "", "", "", "", ""];
let current = "X";
let running = false;

startGame();

function startGame()
{
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartbtn.addEventListener("click", restartGame);
    statusText.textContent = `${current}'s turn`;
    running = true;
}

function checkPosition(cell, index)
{
    options[index] = current;
    cell.textContent = current;

}


function winCondition()
{

    for(const cond of winCond)
    {
        let [a,b,c] = cond;
        if (options[a] && (options[a] == options[b] && options[a] == options[c]))
        {
            return true;
        }

    }

    return false;


}

function cellClicked()
{
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running)
    {
        return;
    }

    checkPosition(this, cellIndex);
    
    if (winCondition() == true) {
        statusText.textContent = `${current} has won!`;
        console.log("Someone has won.");
        running = false;
    } else if (!options.includes("")) {
        // Check for draw: no empty cells left
        console.log("No empty cells left - it's a draw.");
        statusText.textContent = "It's a draw!";
        running = false;
    } else {
        console.log("No winner yet, changing player.");
        console.log("Options Array State:", options);
        changePlayer();
        
    }
}


function restartGame()
{
    current = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${current}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function changePlayer()
{
    current = (current == "X") ? "O" : "X";
    statusText.textContent = `${current}'s turn`;
}