fs = require('fs');
fs.readFile('input.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let lines = data.split(/\r?\n/);

    for(i=0; i<lines.length; i++) {
        lines[i] = parseInt(lines[i]);
    }
    loopsteg=0;
   /*for(i=0; i<lines.length; i++) {
        for(j=0; j<lines.length; j++) {
            loopsteg++
            if(lines[i]+lines[j] == 2020) {
                console.log(lines[i]*lines[j]);
            }
        }
    }*/

    for(i=0; i<lines.length; i++) {
        for(j=i+1; j<lines.length; j++) {
            for(k=j+1; k<lines.length; k++) {
                if(lines[i]+lines[j]+lines[k] == 2020) {
                    console.log(lines[i]*lines[j]*lines[k]);
                } 
            }
        }
    }
  });