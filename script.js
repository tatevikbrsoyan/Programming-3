var numberOfSides = 30;
var socket = io();
var side = 30;

socket.on('matrixUpdate', drawMatrix);

function someEvent() {
    // Ասել socket-ին որ տեղի ունեցավ someEvent իրադարձությունը
    socket.emit('someEvent');
}

function setup() {
    createCanvas(numberOfSides * side, numberOfSides * side);
    background('#acacac');
}


function drawMatrix(data) {

    var isSummer = data.isSummer;
    var matrix = data.matrix;

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                console.log("hayk ka xot", i,j);
                if (isSummer) { //եթե ամառ է խոտը կանաչ է 
                    fill("green");
                } else { // հակառակ դեպքում կապույտ է
                    fill(24, 58, 99);
                }
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 4) {
                fill("black");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 5) {
                fill(199, 21, 133);
                rect(j * side, i * side, side, side);
            }
        }
    }

}

function eventClick() {
    socket.emit('event');
}







