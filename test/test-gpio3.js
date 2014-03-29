var gpio = require('../gpio').gpio;

gpio.setSockets({
	"s1" : "4",
	"s2" : "2",
	"s3" : "1",
	"s4" : "15"
});

//gpio.writeAll("1");
//gpio.write("s2","0");
//gpio.write("s3","0");
//gpio.write("s4","0");


gpio.write("s1", 1, function(){
	console.log("setted");
});
gpio.write("s2", 1, function(){
	console.log("setted");
});
gpio.write("s3", 1, function(){
	console.log("setted");
});
