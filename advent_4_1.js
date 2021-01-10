const { connected } = require('process');

fs = require('fs');
fs.readFile('input4.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    let lines = data.split(/\r?\n\r?\n/);
    let correctPassports = 0;

    // a # followed by exactly six characters 0-9 or a-f.
    const hairColorValidator = (hcl) => {
        if(hcl == undefined) {
            return false;
        }
       if(hcl[0] =='#' && hcl.length == 7) {
        for(k=1; k<hcl.length; k++) { // startar loopen på indexet efter #
           if((hcl[k].match(/[0-9a-f]/g)) == null) {
               return false;
           }
        }
        return true;
       } else {
           return false;
       }
     
    }
 
    for(i=0; i<lines.length; i++) {
        lines[i] = lines[i].replace(/(\r\n|\n|\r)/gm, " "); // gör att varje enskilt pass är på en rad
        let fieldString= lines[i].split(' '); // dela upp varje field till en egen sträng
        let keyPairs = []; // array för key pair values
         for(j=0; j<fieldString.length; j++) {
             fieldString[j] = fieldString[j].split(':');
             keyPairs[fieldString[j][0]] = fieldString[j][1]; // hash map
         }
         // Del 1
         /*if((fieldString.length == 7 && keyPairs['cid'] == undefined) || (fieldString.length == 8) ) {
            correctPassports++
        }*/
        // Del 2
        
        if( (keyPairs['hgt'] != undefined && keyPairs['hgt'].includes('in')) ||
            ( keyPairs['hgt'] != undefined && keyPairs['hgt'].includes('cm')) ) {
            let inOrCm = keyPairs['hgt'].substr(keyPairs['hgt'].length-2, keyPairs['hgt'].length);
            // Tar bort cm eller in för att kunna göra om till integer
            keyPairs['hgt'].slice(0, -2);
            keyPairs['hgt'] = parseInt(keyPairs['hgt']);
            if(inOrCm=='in') {
                if(!(keyPairs['hgt'] >= 59 && keyPairs['hgt'] <= 76)) {
                    continue; // hoppa till nästa pass då det inte stämmer
                }
            } else if (inOrCm == 'cm') {
                if(!(keyPairs['hgt'] >= 150 && keyPairs['hgt'] <= 193)) {
                    continue; // hoppa till nästa pass då det inte stämmer
                }
            } 
        } else {
            continue;
        }
        if(!hairColorValidator(keyPairs['hcl'])) {
            continue;
        }
        if((keyPairs['ecl'] != 'amb' && keyPairs['ecl'] != 'blu'  && keyPairs['ecl'] != 'brn'
            && keyPairs['ecl'] != 'gry' && keyPairs['ecl'] != 'grn' && keyPairs['ecl'] != 'hzl'
            && keyPairs['ecl'] != 'oth') || keyPairs['ecl'] == undefined) {
                continue;
            }
        if(isNaN(keyPairs['pid']) || keyPairs['pid'].length != 9 || keyPairs['pid'] == undefined ) {
            continue;
        }
        keyPairs['byr'] = parseInt(keyPairs['byr']);
        keyPairs['iyr'] = parseInt(keyPairs['iyr']);
        keyPairs['eyr'] = parseInt(keyPairs['eyr']);

        if( (keyPairs['byr'] >= 1920 && keyPairs['byr'] <= 2002) && 
            (keyPairs['iyr'] >= 2010 && keyPairs['iyr'] <= 2020) &&
            (keyPairs['eyr'] >= 2020 && keyPairs['eyr'] <= 2030)
            ) {
            correctPassports++
        }
    }
    console.log(correctPassports);

    
});