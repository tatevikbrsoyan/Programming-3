var LivingCreature = require('./LivingCreature')



module.exports = class Pink extends LivingCreature { //երբ խոտակերները 3-ից քիչ են,առաջանում է ու խոտ է ուտում
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 4;
        this.multiply = 8;
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
        this.updateCoordinates;
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
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat(isSummer) {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var grassCells = this.chooseCell(1);
        var coord = random(grassCells);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply += 2;
            //փոխում է էներգիան

            //եթե ամառ է էներգիան մեծանում է 1-ով
            if (isSummer) {
                this.energy++;
               // console.log("amar a");
            } else {  //եթե ձմեռ է էներգիան մեծանում է -2ով
                this.energy += 2;
                //console.log('dzmer a ');
            }

            // սննդի զանգվածից ջնջում է կերված սնունդը
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
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
            if (this.energy < 0) {
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
            //ստեղծում է նոր օբյեկտ 
            //և տեղադրում է այն pinks զանգվածի մեջ
            var kerpar = new Pink(x, y);
            pinksArr.push(kerpar);

            //հիմնական matrix-ում կատարում է գրառում նոր pink-ի մասին
            matrix[y][x] = 5;
        }
    }
    die() {
       
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;
        

        //ինքն իրեն  ջնջում է  զանգվածից
        for (var i in pinksArr) {
            if (this.x == pinksArr[i].x && this.y == pinksArr[i].y) {
                pinksArr.splice(i, 1);
            }
        }

    }
}
