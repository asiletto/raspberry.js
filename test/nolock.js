var cronJob = require('cron').CronJob;
var sleep = require('sleep');

new cronJob('*/2 * * * * *', function(){

  sleep.sleep(10);
  console.log('You will see this message every 2 seconds ' + Date() );

}, null, true, null);

