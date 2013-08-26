var facts = {
  sensors: [],
  actuators: []
};

exports.facts = facts;

var sensor = function(name, temp){
  this.name = name;
  this.temp = temp;
};

exports.sensor = sensor;

var actuator = function(name, state){
  this.name = name;
  this.state = state;
};

exports.actuator = actuator;

function setSensor(name, temp){
 var found = false;
 for(var i=0;i<facts.sensors.length;i++){
  if(facts.sensors[i].name == name){
    facts.sensors[i].temp = temp;
    found = true;
  }
 }
 if(!found)
  facts.sensors.push( new sensor(name, temp) );
}

exports.setSensor = setSensor;

function setActuator(name, state){
 var found = false;
 for(var i=0;i<facts.actuators.length;i++){
  if(facts.actuators[i].name == name){
    facts.actuators[i].state = state;
    found = true;
  }
 }
 if(!found)
  facts.actuators.push( new actuator(name, state) );
}

exports.setActuator = setActuator;

