var FixedQueue = require('./fixed-queue.js').FixedQueue;

function getAverage(elmt){
var sum = 0;
for(var i = 0; i < elmt.length; i++){
    sum += parseInt(elmt[i]);
}

var avg = sum/elmt.length;
return avg;
}

var temps = new FixedQueue(5);
console.log("initial:",temps);

temps.push(5);
console.log("avg: "+getAverage(temps)+" temps: ",temps);

temps.push(6);
console.log("avg: "+getAverage(temps)+" temps: ",temps);

temps.push(7);
console.log("avg: "+getAverage(temps)+" temps: ",temps);

temps.push(8);
console.log("avg: "+getAverage(temps)+" temps: ",temps);

temps.push(9);
console.log("avg: "+getAverage(temps)+" temps: ",temps);

temps.push(10);
console.log("avg: "+getAverage(temps)+" temps: ",temps);

temps.push(11);
console.log("avg: "+getAverage(temps)+" temps: ",temps);

temps.push(12);
console.log("avg: "+getAverage(temps)+" temps: ",temps);
