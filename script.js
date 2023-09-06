const target = document.getElementById("target");
const target2 = document.getElementById("target2");
const playArea = document.getElementById('playArea');
const timerElement = document.getElementById("timer");
const hitsElement = document.getElementById("hits");


const clickSound = document.getElementById("clickSound")

let startGame = false;
let remainingTime = 10000;
let hits = 0;


target.style.display = "none";
target2.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    const start = document.getElementById("start");
    start.addEventListener("click", function () {
        startGame = true;
        randomizeImg(target, playArea);
        randomizeImg(target2, playArea);
        target.style.display = "block";
        target2.style.display = "block";
        updateTimer();
    })

    target.addEventListener("click", function () {
        if (startGame) {
            clickSound.play();
            hits++;
            hitsElement.textContent = hits;
            randomizeImg(target, playArea);
        }
    })
    target2.addEventListener("click", function () {
        if (startGame) {
            clickSound.play();
            hits++;
            hitsElement.textContent = hits;
            randomizeImg(target2, playArea);
        }
    })
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
        // Hier kannst du Code hinzufügen, der nach Ablauf des Timers ausgeführt wird
    } else {
        // Warte 10 Millisekunden und aktualisiere dann den Timer erneut
        setTimeout(updateTimer, 10);
    }
}

