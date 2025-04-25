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
    localStorage.setItem("score", JSON.stringify(score))
    score = {
        wins: 0,
        losses: 0,
        ties: 0,
    }
    scoreElem.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties ${score.ties}`
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