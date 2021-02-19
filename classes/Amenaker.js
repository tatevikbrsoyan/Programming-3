import {LivingCreature} from './LivingCreature';
module.exports = class Amenaker extends LivingCreature { //ուտում է խոտ և խոտակեր
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 8;
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
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //նոր կորդինատներ է ստանում
            this.x = x;
            this.y = y;
        }
    }

    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var eatersCells = this.chooseCell(2);
        var grassCells = this.chooseCell(1);
        var final = eatersCells.concat(grassCells);
        var coord = random(final);

        //եթե կա հարմար սնունդ
        if (coord) {
            var x = coord[0];
            var y = coord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            var snund = matrix[y][x];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply += 2;

            //մեծացնում է էներգիան
            this.energy++;
            //եթե ուտում է խոտ,խոտին ջնջում է խոտակերների զանգվածից
            if (snund == 1) {
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
            }
            //եթե ուտում է խոտակեր,խոտակերին է ջնջում խոտակերների զանգվածից
            else if (snund == 2) {
                for (var i in eatersArr) {
                    if (x == eatersArr[i].x && y == eatersArr[i].y) {
                        eatersArr.splice(i, 1);
                    }
                }

            }
            // եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 12) {
                this.mul()
                this.multiply = 0;
            }
        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
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
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ - ամենակեր
            var newamen = new Amenaker(x, y);
            amenakernerArr.push(newamen);

            //հիմնական matrix-ում կատարում է գրառում նոր ամենակերի մասին
            matrix[y][x] = 5;
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //ինքն իրեն  ջնջում է ամենակերների զանգվածից
        for (var i in amenakernerArr) {
            if (this.x == amenakernerArr[i].x && this.y == amenakernerArr[i].y) {
                amenakernerArr.splice(i, 1);
            }
        }
    }

}