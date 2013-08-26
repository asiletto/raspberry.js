var sensor = require('./objects').sensor;

var s1 = new sensor("TEMP1", 15);
var s2 = new sensor("TEMP2", 10);
var s3 = new sensor("TEMP5");

console.log("sensor1", s1);
console.log("sensor2", s2);
console.log("sensor3", s3);
