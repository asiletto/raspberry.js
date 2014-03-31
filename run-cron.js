var DHT22 = require('./lib/DHT22').DHT22;
var DS18B20 = require('./lib/DS18B20').DS18B20;
var dao = require('./bedao').BeDAO;
var cronJob = require('cron').CronJob;
var gpio = require('./gpio').gpio;

var blatte = {name:"blatte",pin:"4"};
var formicheBianco = {name:"formiche(bianco)",pin:"2"};
var formicheGrigio = {name:"formiche(grigio)",pin:"1"};

function defaultCallback(actuator, value){
	if(value == 1)
		console.log("switched socket ["+actuator.name+"] ON");
	if(value == 0)
		console.log("switched socket ["+actuator.name+"] OFF");
	
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
	moveActuators(measuresSensors, measuresActuators);
}

function moveActuators(measuresSensors, measuresActuators){
	var tempForm1 = measuresSensors['s1'];
	var tempForm2 = measuresSensors['s2'];
	var tempRoaches = measuresSensors['s3'];
	var actForm1 = measuresActuators['a3']
	var actForm2 = measuresActuators['a2']
	var actRoaches = measuresActuators['a1']

	controlTemperature(tempForm1, actForm1, formicheGrigio, 27.0, 27.2);
	controlTemperature(tempForm2, actForm2, formicheBianco, 27.0, 27.2);
	controlTemperature(tempRoaches, actRoaches, blatte, 27.0, 27.2);		
}

function controlTemperature(sensorMeasure, actuatorMeasure, actuator, low, high){
	if(sensorMeasure > high && actuatorMeasure == 1){
		gpio.write(actuator, 0, defaultCallback);
	}
	if(sensorMeasure < low && actuatorMeasure == 0){
		gpio.write(actuator, 1, defaultCallback);
	}
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

