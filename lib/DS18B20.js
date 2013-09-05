var fs = require('fs');

//todo check crc?
var minRange = 10;
var maxRange = 70;

var DS18B20 = function(sensor){
	this.id = sensor.id;
	this.serie = Object.keys(sensor.series)[0];
	this.file = sensor.file;
};

DS18B20.prototype.read = function() {
  var buffer = fs.readFileSync(this.file);
  var data = buffer.toString('ascii').split(" "); // Split by space
  var degree  = parseFloat(data[data.length-1].split("=")[1])/1000.0;
  degree = Math.round(degree * 10) / 10;

  return {
	'values': [
		{ 'sensor': this.serie, 'value': degree }
	], 
	'valid': ( degree<maxRange && degree>minRange ) ? true : false
  };
  
};

exports.DS18B20 = DS18B20;