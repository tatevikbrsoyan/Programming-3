var LivingCreature = require("./LivingCreature");
//խոտի կլասը
 module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
    }

    //mul() բազմացում
    mul() {
        this.multiply++;
        if (this.multiply >= 12) {
            //հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var emptyCells = this.chooseCell(0);
            var coord = random(emptyCells);
            if (coord) {
                var x = coord[0];
                var y = coord[1];

                //ավելացնում է նոր խոտ խոտերի զանգվածում
                var newGrass = new Grass(x, y);
                grassArr.push(newGrass);

                //ավելացնում է նոր խոտ մատրիցում
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
