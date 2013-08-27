var FixedQueue = require('./fixed-queue.js').FixedQueue;
var qlen = 6;

var facts = {
  sensors: [],
  actuators: []
};

exports.facts = facts;

var sensor = function(name, temp){
  this.queue = new FixedQueue(qlen);
  this.queue.push(temp);
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
    facts.sensors[i].queue.push(temp);
    found = true;
  }
 }
 if(!found)
  facts.sensors.push( new sensor(name, temp) );
}

exports.setSensor = setSensor;

function getSensor(name){

 for(var i=0;i<facts.sensors.length;i++)
  if(facts.sensors[i].name == name)
    return facts.sensors[i].temp;
 return undefined;

}

function getSensorAverage(name){

for(var i=0;i<facts.sensors.length;i++)
  if(facts.sensors[i].name == name){
   var elmt = facts.sensors[i].queue;
   var sum = 0;
   for(var i = 0; i < elmt.length; i++){
     sum += parseInt(elmt[i]);
   }

   var avg = sum/elmt.length;
   return avg;
  }
 return undefined;
}

exports.getSensorAverage = getSensorAverage;

exports.getSensor = getSensor;

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

function getActuator(name){
for(var i=0;i<facts.actuators.length;i++)
  if(facts.actuators[i].name == name)
    return facts.actuators[i].state;
return undefined;
}

exports.getActuator = getActuator;
