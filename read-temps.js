var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var db = new sqlite3.Database('measures.db');

db.serialize(function() {
  
  db.all("SELECT * FROM sensors", function(err, rows){
    var stmt = db.prepare("INSERT INTO log VALUES (?,?,?,?)");    
    for(idx in rows){
      var row = rows[idx];
      console.log("reading sensor "+row.name + "("+row.type+"): " + row.file);

      if("DS1820" == row.type){
        var degree = readTempDS1820(row.file);
        console.log("temperature of sensor " + row.name + " is " + degree + " celsius");
        stmt.run(row.name, Date.now(), degree, "N");
      }
    }
    stmt.finalize();
    db.close();

  });
});

/* Read current temperature from sensor
 * format:
 * 37 00 4b 46 ff ff 07 10 1e : crc=1e YES
 * 37 00 4b 46 ff ff 07 10 1e t=27312 
 * from https://github.com/talltom/PiThermServer/
 */
function readTempDS1820(file){
  var buffer = fs.readFileSync(file);
  var data = buffer.toString('ascii').split(" "); // Split by space
  var degree  = parseFloat(data[data.length-1].split("=")[1])/1000.0;
  degree = Math.round(degree * 10) / 10;
  return degree;
};
