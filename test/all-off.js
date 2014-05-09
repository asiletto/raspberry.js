var gpio = require('../gpio').gpio;

var pin4 = {name:"PRESA1 (Formiche bianco 25W)",pin:"4"};
var pin2 = {name:"PRESA2 (Ex blatte 50W)",pin:"2"};
var pin1 = {name:"PRESA3 (da verificare)",pin:"1"};
var pin15= {name:"PRESA4 (da verificare)",pin:"15"};

function defaultCallback(actuator, value){
	if(value == 1)
		console.log("switched socket ["+actuator.name+"] ON");
	if(value == 0)
		console.log("switched socket ["+actuator.name+"] OFF");
	
}

//test: close all the power sockets
gpio.write(pin1, 0, defaultCallback);
gpio.write(pin2, 1, defaultCallback);
gpio.write(pin4, 0, defaultCallback);
