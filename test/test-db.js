var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('measures.db');

db.serialize(function() {
  db.run("CREATE TABLE log (sensor TEXT, timestamp INTEGER, value REAL, sync TEXT)");

  var stmt = db.prepare("INSERT INTO log VALUES (?,?,?,?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("TEMP1", Date.now(), i, "N");
  }
  stmt.finalize();

  db.each("SELECT * FROM log", function(err, row) {
      console.log(row.sensor + ":" + row.timestamp + " = " + row.value);
  });
});

db.close();
