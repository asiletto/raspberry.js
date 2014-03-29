var gpio = function(){
	this.GPIO_CMD = "/usr/local/bin/gpio";
	this.sockets = {};
}

exports.gpio = new gpio();

gpio.prototype.setSockets = function(sockets){
	this.sockets = sockets;
};

gpio.prototype.writeAll = function(value){
	for (var key in this.sockets) {
		this.setSocket(key, value);
	}
}

gpio.prototype.read = function(number, callback){
	var exec = require('child_process').exec;
	var command = this.GPIO_CMD + ' read '+this.sockets[number];
//console.log("executing: "+command);
	exec(command, function (error, stdout, stderr) {
		if(error)
			throw error;

		callback(stdout);
	});
}


gpio.prototype.write = function(number, value, callback){
	var exec = require('child_process').exec;
	var command = this.GPIO_CMD + ' write '+this.sockets[number]+' '+value;
//console.log("executing: "+command);
	exec(command, function (error, stdout, stderr) {
		if(error)
			throw error;
		
		callback();
	});
}
