var gpio = require('gpio');

var socket1 = gpio.export(4, {
	ready : function(){
		socket1.set();
	}
});

var socket2 = gpio.export(2, {
	ready : function(){
		socket2.set();
	}
});

var socket3 = gpio.export(1, {
	ready : function(){
		socket3.set();
	}
});

var socket4 = gpio.export(15, {
	ready : function(){
		socket4.set();
	}
});
