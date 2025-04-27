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

const scoreElem = document.querySelector(".W-L-T")
const picksElem = document.querySelector(".picks")
const resultElem = document.querySelector(".result")

scoreElem.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties ${score.ties}`

let htmlRenderHelper = "";
let interval = 0;
let isPlaying = false;
let intervalId;

function autoPlay() {
    if (interval != 0) {
        interval = document.querySelector("#interval").value
        if (!isPlaying) {
            isPlaying = true;

            intervalId = setInterval(() => {
            const myMove = pickComputerMove();
            playGame(myMove);
            }, interval);

            document.querySelector("#autoplay-button")
            .innerHTML = `Stop Auto Play (every${interval}ms)`;

        } else {
            isPlaying = false;
            clearInterval(intervalId);

            document.querySelector("#autoplay-button")
            .innerHTML = 'Auto Play';
        }
    } else {
        htmlRenderHelper = `<input  id="interval" type="number" placeholder="input interval in ms then click autoplay again" onkeydown="keyDown(event)"></input>`;
        document.querySelector("#autoplay-div").innerHTML =  htmlRenderHelper;
    }
}

 function onKeyDown(event) {
    interval = document.querySelector("#interval").value

    if (typeof interval === "number") {
        htmlRenderHelper = `<input  id="interval" type="number" placeholder="input interval in ms then click autoplay again" onkeydown="keyDown(event)"></input>`;
        document.querySelector("#autoplay-div").innerHTML =  htmlRenderHelper;
        if (event.key === "Enter") {
            autoPlay();
        }
    } else {
        htmlRenderHelper = `<input  id="interval" type="number" placeholder="input interval in ms then click autoplay again" onkeydown="keyDown(event)"></input><p>The input value is not a number</p>`;
        
    }

    
 }