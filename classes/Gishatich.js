var LivingCreature = require('./LivingCreature')

module.exports = class Gishatich extends LivingCreature { //ուտում է խոտակեր
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 15;
        this.energy = 8;
    }

    //թարմացնել շրջապատի կոորդինատները
    updateCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է character արգումենտով
    chooseCell(character) {
        this.updateCoordinates();
        return super.chooseCell(character)
    }

    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //շարժվում է
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat(isSummer) {
     


        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var eatersCells = this.chooseCell(1);
        var coord = random(eatersCells);


        //եթե կա հարմար սնունդ
        if (coord) {
            var multiply = 2;
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է


            //եթե ամառ է ուտելուց էներգիան մեծացնում է  է 3-ով, եթե ոչ ` 1-ով, 
            //եթե ամառ է ուտելուց multiply մեծացնում է 2-ով, եթե ոչ ` 1-ով, 

            if (isSummer) {
                this.multiply += 2;
                this.energy += 3;
             
            } else {
                this.multiply++;
                this.energy++
              
            }



            // սննդի զանգվածից ջնջում է կերված սնունդը
            for (var i in eatersArr) {
                if (x == eatersArr[i].x && y == eatersArr[i].y) {
                    eatersArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy -= 2;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 0֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var emptyCells = this.chooseCell(0);
        var coord = random(emptyCells);

        //եթե կա բազմանում է
        if (coord) {
            var x = coord[0];
            var y = coord[1];
            this.multiply++;
            //ստեղծում է նոր օբյեկտ (գիշատիչ) 
            //և տեղադրում է այն գիշատիչների զանգվածի մեջ
            var newgish = new Gishatich(x, y);
            gishatArr.push(gish);
            //հիմնական matrix-ում կատարում է գրառում նոր գիշատիչի մասին
            matrix[y][x] = 3;
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ջնջում է ինքն իրեն գիշատիչների զանգվածից
        for (var i in gishatArr) {
            if (this.x == gishatArr[i].x && this.y == gishatArr[i].y) {
                gishatArr.splice(i, 1);
            }
        }
    }

}

