var gpio = require('../gpio').gpio;

var blatte = {name:"blatte",pin:"4"};
var formicheBianco = {name:"formiche(bianco)",pin:"2"};
var formicheGrigio = {name:"formiche(grigio)",pin:"1"};

function defaultCallback(actuator, value){
	console.log("setted "+actuator.name+" socket on value "+value);
}

gpio.write(blatte, 1, defaultCallback);
