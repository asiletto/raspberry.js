var dao = require('../bedao').BeDAO;
var gpio = require('../gpio').gpio;

function addActuatorToMeasure(id, value, measures){
	console.log("addActuatorToMeasure("+id+","+value+")");
	if(measures.timestamp === undefined)
		measures.timestamp = new Date();

		measures[id] = value;
}

var after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

function notifyMeasures(measures){
	console.log("notifyMeasures called: "+ measures);
}
  
setTimeout(function(){

	var measures = {};

	dao.getActuators(function(err, actuators){
	
		console.log("actuators to read: " + actuators.length);
		var finished = after(actuators.length, notifyMeasures);
		for(var i in actuators){
			var actuator = actuators[i];
			//console.log("i: "+i+", pin:" + actuator.pin);
			gpio.read(actuator, function(actuator, value){
				//console.log("actuator " + actuator.series[0].name + " has value " + value);
				addActuatorToMeasure(actuator.series[0].id, value, measures);
				finished(measures);
			});
		}
		
	});

}, 3000);

setTimeout(function(){
	process.exit();
}, 6000);