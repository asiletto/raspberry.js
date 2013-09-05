var DHT22 = require('../lib/DHT22').DHT22;
var DS18B20 = require('../lib/DS18B20').DS18B20;
var dao = require('../bedao').BeDAO;
var cronJob = require('cron').CronJob;

var driverMap = {
	"DHT22" : DHT22,
	"DS18B20": DS18B20
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
		console.log("measure not valid", measure);
	}
}

setTimeout(function(){
	//wait the connection to be available...
	new cronJob('*/2 * * * * *', function(){
		
		var measures = {};
		//read all enabled sensors
		dao.getSensors(function(err, sensors){
			for(var i in sensors){
				var sensor = sensors[i];
				var driver = new driverMap[sensor.sensor](sensor);
				//read sensor value(s)
				var readValues = driver.read();
				addToMeasure(readValues, measures);
			}
			//log measures
			dao.onSample(measures);
		});

	}, null, true, null);

}, 3000);

