var sockets = {
	"1" : "15",
	"2" : "1",
	"3" : "2",
	"4" : "4"
};

var GPIO_CMD = "/usr/local/bin/gpio";

//setSocket("1", "1");
//setSocket("4", "1");
setAll("1");

function setAll(value){
	for (var key in sockets) {
		setSocket(sockets[key], value);
	}
}

function setSocket(number, value){
var exec = require('child_process').exec;
	exec(GPIO_CMD + ' write '+sockets[number]+' '+value, function (error, stdout, stderr) {
		console.log("error: " + error);
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
	});
}

