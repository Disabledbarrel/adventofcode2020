fs = require('fs');
fs.readFile('input2.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let lines = data.split(/\r?\n/);
    let correctPasswoords = 0;

    for(i=0; i<lines.length; i++) {
       lines[i]= lines[i].split(' ');
       let range = lines[i][0].split('-');
       let rangeStart = parseInt(range[0]);
       let rangeStop = parseInt(range[1]);
       let letter = lines[i][1][0];
       let string = lines[i][2];
       let re = new RegExp(letter, "g");
       let count = (string.match(re) || []).length;
       if(count >= rangeStart && count <= rangeStop) {
         correctPasswoords++;
       }
    }
    
    console.log(correctPasswoords);
});