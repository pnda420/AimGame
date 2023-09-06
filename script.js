startGame = false;

const target = document.getElementById("target");
target.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    const start = document.getElementById("start");
    start.addEventListener("click", function () {
        startGame = true;
        randomizeImg(target);
        target.style.display = "block";
    })


    target.addEventListener("click", function () {
        if (startGame) {
            randomizeImg(target);
        }
    })
})




function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function randomizeImg(el) {
    el.style.position = "absolute";
    el.style.top = randint(0, 500) + "px";
    el.style.left = randint(0, window.innerWidth - 100) + "px";
}




