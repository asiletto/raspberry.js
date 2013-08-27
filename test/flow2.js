var cronJob = require('cron').CronJob;
var Jools = require('jools');
var repo = require('./objects');
var rules = require('./test-rules2').rules;

var j = new Jools(rules);

repo.setSensor("TEMP1",35);
repo.setSensor("TEMP2",11);
repo.setSensor("TEMP3",25);

repo.setActuator("TAPPETINO", "off");
repo.setActuator("RISCALDATORE", "off");
repo.setActuator("VENTOLA", "off");
repo.setActuator("TAPPETINO", "on");

new cronJob('* * * * * *', function(){
  console.log("exec");
  console.log("facts:", repo.facts);
  console.log("===========================");
  console.log("getAverage(TEMP1):", repo.getSensorAverage("TEMP1"));

  var result = j.execute(repo.facts);

  if(result.changes == undefined)
    console.log("no changes");
  else {
//    console.log("changes: ", result.changes);
    for (var key in result.changes) {
	var value = result.changes[key];
        console.log("setting "+key+"="+value);
        repo.setActuator(key, value);
    }
  }


  //simulate temp changes
  if(repo.getActuator("RISCALDATORE") == "on")
    repo.setSensor("TEMP1", repo.getSensor("TEMP1") + 1 );
  else
    repo.setSensor("TEMP1", repo.getSensor("TEMP1") - 0.5 );

  if(repo.getActuator("VENTOLA") == "on")
    repo.setSensor("TEMP1", repo.getSensor("TEMP1") - 0.5 );

   



}, null, true, null);

