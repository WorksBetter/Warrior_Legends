var canvas;
var canvasContext;

var p1 = new warriorClass();

var showingWinScreen = false;

window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');

    this.p1.init(playerPic, "You");

    initInput();

    p1.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);

    loadImages();
}

function loadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
    canvasContext.font = "30px Verdana";
    p1.reset();
}

function moveEverything() {
    p1.move();
}

function drawEverything() {

    if (showingWinScreen) {

        canvasContext.fillStyle = 'hotpink';
        canvasContext.fillText("Well Done!", 285, 200);
        canvasContext.fillStyle = 'purple';
        canvasContext.fillText("Click to Continue", 285, 450);
        return;
    }

    drawRoom();

    p1.draw();
}