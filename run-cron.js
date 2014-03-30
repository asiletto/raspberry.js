var DHT22 = require('./lib/DHT22').DHT22;
var DS18B20 = require('./lib/DS18B20').DS18B20;
var dao = require('./bedao').BeDAO;
var cronJob = require('cron').CronJob;
var gpio = require('./gpio').gpio;

var blatte = {name:"blatte",pin:"4"};
var formicheBianco = {name:"formiche(bianco)",pin:"2"};
var formicheGrigio = {name:"formiche(grigio)",pin:"1"};

function defaultCallback(actuator, value){
	console.log("setted "+actuator.name+" socket on value "+value);
}

//test: open all the power sockets
gpio.write(blatte, 1, defaultCallback);
gpio.write(formicheBianco, 1, defaultCallback);
gpio.write(formicheGrigio, 1, defaultCallback);

var driverMap = {
	"DHT22" : DHT22,
	"DS18B20": DS18B20
};

var after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };


function addToMeasure(measure, measures){
	if(measures.timestamp === undefined)
		measures.timestamp = new Date();
		
	if(measure.valid){
		for(var i in measure.values){
			var item = measure.values[i];
			measures[item.sensor] = item.value;
		}
	}else{
		console.log(new Date()+ " measure not valid", measure);
	}
}

function addActuatorToMeasure(id, value, measures){
	if(measures.timestamp === undefined)
		measures.timestamp = new Date();

		measures[id] = value;
}

function notifyMeasures(measuresSensors, measuresActuators){
	dao.onSample(measuresSensors, measuresActuators);
}

setTimeout(function(){
	//wait the connection to be available...
	new cronJob('0 * * * * *', function(){
		
		var measuresSensors = {};
		var measuresActuators = {};
		//read all enabled sensors
		dao.getSensors(function(err, sensors){
			for(var i in sensors){
				var sensor = sensors[i];
				var driver = new driverMap[sensor.sensor](sensor);
				//read sensor value(s)
				var readValues = driver.read();
				addToMeasure(readValues, measuresSensors);
			}
		
		});
		
		dao.getActuators(function(err, actuators){
	
		var finished = after(actuators.length, notifyMeasures);
		for(var i in actuators){
			var actuator = actuators[i];
			//console.log("i: "+i+", pin:" + actuator.pin);
			gpio.read(actuator, function(actuator, value){
				//console.log("actuator " + actuator.series[0].name + " has value " + value);
				addActuatorToMeasure(actuator.series[0].id, value, measuresActuators);
				finished(measuresSensors, measuresActuators);
			});
		}
		
	});

	}, null, true, null);

}, 3000);

