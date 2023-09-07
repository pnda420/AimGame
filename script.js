const target = document.getElementById("target");
const target2 = document.getElementById("target2");
const playArea = document.getElementById('playArea');
const timerElement = document.getElementById("timer");
const hitsElement = document.getElementById("hits");
const hits10sElement = document.getElementById("hits10s");
const hits15sElement = document.getElementById("hits15s");
const hits20sElement = document.getElementById("hits20s");


const clickSound = document.getElementById("clickSound")

let startGame = false;
let remainingTime = 10000;
let hits = 0;

let highscoreHits10s = 0;
let highscoreHits15s = 0;
let highscoreHits20s = 0;


const TimeInSeconds = {
    TEN_SECONDS: 10,
    FIFTEEN_SECONDS: 15,
    TWENTY_SECONDS: 20
};

let gamemode = TimeInSeconds.TEN_SECONDS;

target.style.display = "none";
target2.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    const start = document.getElementById("start");
    start.addEventListener("click", function () {
        if (!startGame) {
            hits = 0;
            startGame = true;
            target.style.display = "";
            target2.style.display = "";
            randomizeImg(target, playArea);
            randomizeImg(target2, playArea);

            updateTimer();
        }
    })



    const set10Button = document.getElementById("set10Button");
    set10Button.addEventListener("click", function () {
        if (!startGame) {
            gamemode = TimeInSeconds.TEN_SECONDS;
            remainingTime = 10000;
            timerElement.textContent = "10:000";
        }
    })

    const set15Button = document.getElementById("set15Button");
    set15Button.addEventListener("click", function () {
        if (!startGame) {
            gamemode = TimeInSeconds.FIFTEEN_SECONDS;
            remainingTime = 15000;
            timerElement.textContent = "15:000";
        }
    })

    const set20Button = document.getElementById("set20Button");
    set20Button.addEventListener("click", function () {
        if (!startGame) {
            gamemode = TimeInSeconds.TWENTY_SECONDS;
            remainingTime = 20000;
            timerElement.textContent = "20:000";
        }
    })

    let playAreaClicked = false;
    let target1Clicked = false;
    let target2Clicked = false;

    playArea.addEventListener("click", function () {
        playAreaClicked = true;
        checkClicks();
    });

    target.addEventListener("click", function () {
        if (startGame) {
            target1Clicked = true;
            checkClicks();
            clickSound.play();
            hits++;
            hitsElement.textContent = hits;
            randomizeImg(target, playArea);
        }
    });
    target2.addEventListener("click", function () {
        if (startGame) {
            target2Clicked = true;
            checkClicks();
            clickSound.play();
            hits++;
            hitsElement.textContent = hits;
            randomizeImg(target2, playArea);
        }
    })


    function checkClicks() {
        if (playAreaClicked && !target1Clicked || playAreaClicked && !target2Clicked) {
            console.log("Getroffen");
            playAreaClicked = false;
            target1Clicked = false;
            target2Clicked = false;
        }
    }




})

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomizeImg(el, container) {
    el.style.position = "absolute";

    // Maximale Positionen innerhalb des Container-DIVs
    const maxLeft = container.clientWidth - el.clientWidth;
    const maxTop = container.clientHeight - el.clientHeight;

    // Zufällige Position innerhalb der Grenzen
    const left = randint(0, maxLeft);
    const top = randint(0, maxTop);

    el.style.left = left + "px";
    el.style.top = top + "px";
}


console.log(`Breite: ${playArea.offsetWidth}px, Höhe: ${playArea.offsetHeight}px`);


function updateTimer() {
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    const milliseconds = remainingTime % 1000;

    // Füge führende Nullen hinzu, wenn nötig
    const secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
    const millisecondsString = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds.toString();

    timerElement.textContent = secondsString + "." + millisecondsString;

    // Reduziere die verbleibende Zeit um 10 Millisekunden
    remainingTime -= 10;

    // Überprüfe, ob die Zeit abgelaufen ist
    if (remainingTime < 0) {
        timerElement.textContent = "Zeit abgelaufen!";
        startGame = false;
        target.style.display = "none";
        target2.style.display = "none";
        if (gamemode === TimeInSeconds.TEN_SECONDS) {

            if (hits > highscoreHits10s) {
                highscoreHits10s = hits;
                hits10sElement.textContent = "Highscore 10s: " + highscoreHits10s;
            }
        }

        if (gamemode === TimeInSeconds.FIFTEEN_SECONDS) {
            if (hits > highscoreHits15s) {
                highscoreHits15s = hits
                hits15sElement.textContent = "Highscore 15s: " + highscoreHits15s;
            }
        }

        if (gamemode === TimeInSeconds.TWENTY_SECONDS) {
            if (hits > highscoreHits20s) {
                highscoreHits20s = hits;
                hits20sElement.textContent = "Highscore 20s: " + highscoreHits20s;
            }
        }
        // Hier kannst du Code hinzufügen, der nach Ablauf des Timers ausgeführt wird
    } else {
        // Warte 10 Millisekunden und aktualisiere dann den Timer erneut
        setTimeout(updateTimer, 10);
    }
}

