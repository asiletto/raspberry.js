var cronJob = require('cron').CronJob;
var Jools = require('jools');
var rules = require('./test-rules').rules;
var repo = require('./facts');
//load rules
var j = new Jools(rules);

new cronJob('*/2 * * * * *', function(){
  console.log("exec");

  //read temp from all sensors
  if(repo.facts.temp1==undefined)
    repo.facts.temp1 = 15;
  if(repo.facts.resistenza1 == "on")
    repo.facts.temp1 = repo.facts.temp1 + 1;
  else
    repo.facts.temp1 = repo.facts.temp1 - 0.5;
  
  //update/sync db

  //fire rules
  console.log("facts: ", repo.facts);
  repo.facts = j.execute(repo.facts);
  //execute rules results


}, null, true, null);

