
var DHT22 = function(sensor){
	this.id = sensor.id;
	this.serieTemp = Object.keys(sensor.series)[0];
	this.serieHum = Object.keys(sensor.series)[1];
	this.pinNumber = sensor.pin;
};

DHT22.prototype.read = function() {
  var self = this;
  return {
	'values': [
		{ 'sensor': this.serieTemp, 'value': 29 },
		{ 'sensor': this.serieHum, 'value': 56 }
	], 
	'valid': true
  };
};

exports.DHT22 = DHT22;