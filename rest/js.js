// listeneri misto onclick
document.getElementById("rock-button").addEventListener("click", () => {
    playGame("rock")
})
document.getElementById("paper-button").addEventListener("click", () => {
    playGame("paper")
})
document.getElementById("scissors-button").addEventListener("click", () => {
    playGame("scissors")
})
document.getElementById("reset-score-button").addEventListener("click", () => {
    resetScore()
})
document.getElementById("autoplay-button").addEventListener("click", () => {
    autoPlay()
})



function playGame (myMove) {
    const PCmove = pickPCmove()

    let result = ""

    if (myMove === "rock") {
        if (PCmove === "paper") {
            result = "You lose"
        } else if (PCmove === "scissors") {
            result = "You Win"
        } else if (PCmove === "rock") {
            result = "Tie"
        }
    } else if (myMove === "paper") {
        if (PCmove === "paper") {
            result = "Tie"
        } else if (PCmove === "scissors") {
            result = "You lose "
        } else if (PCmove === "rock") {
            result = "You Win"
        }
    } else if (myMove === "scissors") {
        if (PCmove === "paper") {
            result = "You Win"
        } else if (PCmove === "scissors") {
            result = "Tie"
        } else if (PCmove === "rock") {
            result = "You lose"
        }
    }

    if (result === "You Win") {
        score.wins += 1;
    } else if (result === "Tie") {
        score.ties += 1;
    } else if (result === "You lose") {
        score.losses += 1;
    }

    localStorage.setItem("score", JSON.stringify(score))
/*
    alert(`You pickes ${myMove}. The computer picked ${PCmove}. ${result}
Wins: ${score.wins} Losses: ${score.losses} Ties ${score.ties}`)
*/
resultElem.innerHTML = `${result}`
picksElem.innerHTML = `You picked ${myMove}. The coumputer picked ${PCmove}`
scoreElem.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties ${score.ties}`
}


function pickPCmove () {
    const randomNumber = Math.random()

    let PCmove = ""

    if (randomNumber < 1 / 3 ) {
        PCmove = "rock"
    } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3 ) {
        PCmove = "paper"
    } else if (randomNumber > 2 / 3 ) {
        PCmove = "scissors"
    }

    return PCmove;
}

function resetScore() {
    score = {
        wins: 0,
        losses: 0,
        ties: 0,
    }
    localStorage.setItem("score", JSON.stringify(score))
    scoreElem.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties ${score.ties}`;
}

let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};
console.log("passed line 100 aka let score")
console.log(score)

const scoreElem = document.querySelector(".W-L-T")
const picksElem = document.querySelector(".picks")
const resultElem = document.querySelector(".result")

scoreElem.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties ${score.ties}`

let htmlRenderHelper = "";
let interval = 0;
let isPlaying = false;
let intervalId;
let timeTaken;
function autoPlay() {
    const inputElem = document.querySelector("#interval");

    if (!inputElem) {
        // Create input box if not yet present
        const html = `<input id="interval" type="number" placeholder="Enter interval in ms and press Auto Play again"></input>`;
        document.querySelector("#autoplay-div").innerHTML = html;
        keyDownListener();
        return;
    }

    const inputVal = parseInt(inputElem.value);

    if (isNaN(inputVal) || inputVal <= 0) {
        alert("Please enter a valid positive number for the interval.");
        return;
    }

    interval = inputVal;

    if (!isPlaying) {
        isPlaying = true;

        intervalId = setInterval(() => {
            timeTaken = Date.now()
            const myMove = pickPCmove();
            playGame(myMove);
            timeTaken = Date.now() - timeTaken - interval
            console.log(timeTaken)
        }, interval);

        document.querySelector("#autoplay-button").innerHTML = `Stop Auto Play (every ${interval} ms)`;
    } else {
        isPlaying = false;
        clearInterval(intervalId);
        document.querySelector("#autoplay-button").innerHTML = 'Auto Play';
    }
}
function keyDown(event) {
    if (event.key === "Enter") {
        autoPlay();
    }
}

    

// funkce ktera je jenom protoze musim to pouzit 3 krat
function keyDownListener() {
    const intervalInput = document.getElementById("interval");
    intervalInput.addEventListener("keydown", keyDown);
}