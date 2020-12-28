const { connected } = require('process');

fs = require('fs');
fs.readFile('input4.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let lines = data.split(/\r?\n\r?\n/);
    let correctPassports = 0;

    for(i=0; i<lines.length; i++) {
        lines[i] = lines[i].replace(/(\r\n|\n|\r)/gm, " ");
        let fieldString= lines[i].split(' '); // dela upp varje field till en egen sträng
        let keyPairs = []; // array för key pair values
         for(j=0; j<fieldString.length; j++) {
             fieldString[j] = fieldString[j].split(':');
             keyPairs[fieldString[j][0]] = fieldString[j][1];
         }
         if((fieldString.length == 7 && keyPairs['cid'] == undefined) || (fieldString.length == 8) ) {
            correctPassports++
        }
    }
    console.log(correctPassports);

    
});