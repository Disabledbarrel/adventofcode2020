const { connected } = require('process');

fs = require('fs');
fs.readFile('input3.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let lines = data.split(/\r?\n/);

    /*let x = 0;
    let treeCount = 0;

    for(i=0; i<lines.length; i++) {
        if(lines[i][x] == "#") {
            treeCount++
        }
        x = (x+3)%lines[0].length; // hoppa 3 steg till höger på nästa rad
    }
    console.log("prutt: " + treeCount);*/

 // Del 2
    const treeCounter = (right, down) => {
        let x = 0;
        let treeCount = 0;

        for(i=0; i<lines.length; i+=down) {
            if(lines[i][x] == "#") {
                treeCount++
            }
            x = (x+right)%lines[0].length; // hoppa 3 steg till höger på nästa rad
        }
        return treeCount;
    }
    let slopeOne = treeCounter(1,1);
    let slopeTwo = treeCounter(3,1);
    let slopeThree = treeCounter(5,1);
    let slopeFour = treeCounter(7,1);
    let slopeFive = treeCounter(1,2);

    console.log(slopeOne*slopeTwo*slopeThree*slopeFour*slopeFive);
});