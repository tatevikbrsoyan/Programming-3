var sideLength = 30;
var numberOfSides = 20;
var socket = io();
var side =30;

socket.on('matrixUpdate', drawMatrix);

function setup() {
    createCanvas(numberOfSides * sideLength, numberOfSides * sideLength);
    background('#acacac');

}

function drawMatrix(data) {
    var matrix = data.matrix;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
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
    console.log(matrix);
}









/*
for(var y = 0;y<30;y++){
    matrix[y]=[];
    for(var x = 0;x<30;x++){
        matrix[y][x]=getRandom(0,5);
    }
}

function setup() {
    noStroke();
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side); //կանվասի չափերը դնել մատրիցի չափերին համապատասխան
    background('#acacac');

    //մատրիցի վրա կրկնակի ցիկլը լցնում է խոտերի, խոտակերների զանգվածները օբյեկտներով
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }else if (matrix[y][x] == 2) {
                var eater = new GrassEater(x, y);
                eatersArr.push(eater);
            }else if (matrix[y][x] == 3) {
                var gish = new Gishatich(x, y);
                gishatArr.push(gish);
            }else if(matrix[y][x]==4){
                var amenaker = new Amenaker(x,y);
                amenakernerArr.push(amenaker);
            }
            else if (matrix[y][x]==5){
                var pin = new Pink(x,y);
                pinksArr.push(pin)
            }
        }
    }
}

function draw() {
    //գծում է աշխարհը
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            }else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            }else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            }else if (matrix[i][j] == 4) {
                fill("black");
                rect(j * side, i * side, side, side);
            }else if(matrix[i][j]==5){
                fill(199,21,133);
                rect(j*side,i*side,side,side);
            }
        }
    }
    //խոտը բազմանում է
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    //խոտակերը ուտում է խոտ
    for (var i in eatersArr) {
        eatersArr[i].eat();
    }
   //գիշատիչը ուտում է խոտակեր
    for(var i in gishatArr){
        gishatArr[i].eat();
    }
    //ամենակերը ուտում է խոտ և խոտակեր
    for(var i in amenakernerArr){
        amenakernerArr[i].eat();
    }
    for(var i in pinksArr){
        pinksArr[i].eat();
    }
    //pink-երբ խոտակերները վերջանում են ուտում է խոտ
    if(eatersArr.length < 3 && pinksArr.length < 3){
        var emptyCells = []
        for(var y = 0; y < matrix.length; ++y) {
            for(var x = 0; x < matrix[y].length; ++x) {
                if(matrix[y][x] == 0) {
                    emptyCells.push([x, y])
                }
            }
        }
        for(var i = 0; i < 2; ++i) {
            var coord = random(emptyCells)
           if(coord){
             var x = coord[0]
            var y = coord[1]
            var pink = new Pink(x, y)
            pinksArr.push(pink)
            matrix[y][x] = 5;
           }
        }
    }
}
*/