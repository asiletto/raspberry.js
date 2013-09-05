
var DHT22 = function(id, serieTemp, serieHum, pinNumber){
	this.id = id;
	this.serieTemp = serieTemp;
	this.serieHum = serieHum;
	this.pinNumber = pinNumber;
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