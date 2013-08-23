var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('measures.db');

db.serialize(function() {
  db.run("CREATE TABLE log (sensor TEXT, timestamp INTEGER, value REAL, sync TEXT)");
  db.run("CREATE TABLE sensors (name TEXT, file TEXT, type TEXT)");
  var stmt = db.prepare("INSERT INTO sensors VALUES (?,?,?)");
  stmt.run("TEMP1", "/root/raspberry.js/test/temp1.txt", "DS1820");
  stmt.run("TEMP2", "/root/raspberry.js/test/temp2.txt", "DS1820");
  stmt.run("TEMP3", "/root/raspberry.js/test/temp3.txt", "DS1820");
  stmt.run("TEMP4", "/root/raspberry.js/test/temp4.txt", "DS1820");
  stmt.run("TEMP5", "/root/raspberry.js/test/temp5.txt", "DS1820");
  stmt.finalize();
});

db.close();
