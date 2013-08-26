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

console.log("initial facts:", repo.facts);

var result = j.execute(repo.facts);

console.log("result: ", result);

