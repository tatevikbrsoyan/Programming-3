var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var weatherCount = 10;


var Grass = require("./classes/Grass");
var GrassEater = require("./classes/GrassEater");
var Amenaker = require("./classes/Amenaker");
var Gishatich = require("./classes/Gishatich");
var Pink = require("./classes/Pink");
const { log } = require("console");

grassArr = []; //խոտերի զանգված
eatersArr = []; //խոտակերների զանգված
gishatArr = [];
amenakernerArr = [];
pinksArr = [];
matrix = [];

app.use(express.static("."));
app.get("/", function (req, res) {
   res.redirect("index.html");
});

server.listen(3000);

getRandomInt = function (min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min);
}


random = function (arr) {
   let randomIndex = Math.floor(Math.random() * arr.length);
   let randomElement = arr[randomIndex];
   return randomElement;
}



function matrixGenerator() {
   var randomMatrix = [0, 0, 1, 1, 1, 1, 0, 2, 2, 3, 3, 4, 4, 5, 5]
   for (var y = 0; y < 30; y++) {
      matrix[y] = [];
      for (var x = 0; x < 30; x++) {
         matrix[y][x] = random(randomMatrix);
      }
   }
}

function start() {
   matrixGenerator();
console.log(matrix);
   //մատրիցի վրա կրկնակի ցիկլը լցնում է խոտերի, խոտակերների զանգվածները օբյեկտներով 
   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 1) {
            var grass = new Grass(x, y);
            grassArr.push(grass);
         } else if (matrix[y][x] == 2) {
            var eater = new GrassEater(x, y);
            eatersArr.push(eater);
         } else if (matrix[y][x] == 3) {
            var gish = new Gishatich(x, y);
            gishatArr.push(gish);
         } else if (matrix[y][x] == 4) {
            var amenaker = new Amenaker(x, y);
            amenakernerArr.push(amenaker);
         }
         else if (matrix[y][x] == 5) {
            var pin = new Pink(x, y);
            pinksArr.push(pin)
         }
      }
   }
}

io.on('connection', function (socket) {
   socket.on('event', function () {

      console.log('event clicked');

      for (var y = 0; y < matrix.length; y++) {
         for (var x = 0; x < matrix.length; x++) {

            if (matrix[y][x] == 1) {
               matrix[y][x] = 0

            }

         }

      }
      grassArr = []
      // ... ավելացնել լոգիկան թե մատրիցայում ինչ է տեղի ունենում ինչ որ իրադարձության ժամանակ	
   });


});



function game() {




   //եթե խոտ չկա պիտի առաջանա
   if (grassArr.length < 1) {
      var x = getRandomInt(0, matrix[0].length);
      var y = getRandomInt(0, matrix.length);
      var counter = 0;
      var limit = matrix[0].length * matrix.length;
      while (matrix[y][x] !== 0 && counter < limit) {
         counter++;
         x = getRandomInt(0, matrix[0].length);
         y = getRandomInt(0, matrix.length);
      }

      var grass = new Grass(x, y);
      grassArr.push(grass);
      matrix[y][x] = 1;
   }

   var isSummer = summer();

   //խոտը բազմանում է
   for (var i in grassArr) {
      grassArr[i].mul();
   }
   //խոտակերը ուտում է խոտ  
   for (var i in eatersArr) {
      eatersArr[i].eat();
   }
   //գիշատիչը ուտում է խոտակեր
   for (var i in gishatArr) {
      // console.log(gishatArr[i]);
      gishatArr[i].eat(isSummer);
   }
   //ամենակերը ուտում է խոտ և խոտակեր
   for (var i in amenakernerArr) {
      amenakernerArr[i].eat();
   }
   for (var i in pinksArr) {
      pinksArr[i].eat();
   }
   //pink-երբ խոտակերները վերջանում են ուտում է խոտ
   if (eatersArr.length < 3 && pinksArr.length < 3) {
      var emptyCells = []
      for (var y = 0; y < matrix.length; ++y) {
         for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 0) {
               emptyCells.push([x, y])
            }
         }
      }
      for (var i = 0; i < 2; ++i) {
         var coord = random(emptyCells)
         if (coord) {
            var x = coord[0]
            var y = coord[1]
            var pink = new Pink(x, y)
            pinksArr.push(pink)
            matrix[y][x] = 5;
         }
      }
   }
   var data = {
      'matrix': matrix,
      'isSummer': isSummer
   };

   io.sockets.emit('matrixUpdate', data);

}

function summer() {
   weatherCount++
   if (weatherCount % 10 > 5) {
      return false
   }
   return true
}





start();
setInterval(game, 1000);
