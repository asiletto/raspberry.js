var facts = {};

exports.sensor = function(name, temp){
  this.name = name;
  this.temp = temp;
}

exports.add = function (key, value) {
	facts[key] = value;
};

exports.get = function(key){
	return facts[key];
};

exports.facts = facts;
