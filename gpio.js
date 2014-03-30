var gpio = function(){
	this.GPIO_CMD = "/usr/local/bin/gpio";
}

exports.gpio = new gpio();

gpio.prototype.read = function(actuator, callback){
	var exec = require('child_process').exec;
	var command = this.GPIO_CMD + ' read '+actuator.pin;

	exec(command, function (error, stdout, stderr) {
		if(error)
			throw error;
			
		var strOut = stdout.replace(/(\r\n|\n|\r)/gm,"");
	
		callback(actuator, parseInt(strOut) );
	});
}

gpio.prototype.write = function(actuator, value, callback){
	var exec = require('child_process').exec;
	var command = this.GPIO_CMD + ' write '+actuator.pin+' '+value;

	exec(command, function (error, stdout, stderr) {
		if(error)
			throw error;
		
		callback(actuator, parseInt(value));
	});
}
