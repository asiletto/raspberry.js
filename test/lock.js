var lockFile = require('lockfile');
var cronJob = require('cron').CronJob;
var sleep = require('sleep');

new cronJob('*/2 * * * * *', function(){

// opts is optional, and defaults to {}
lockFile.lock('some-file.lock', function (er) {
  // if the er happens, then it failed to acquire a lock.
  // if there was not an error, then the file was created,
  // and won't be deleted until we unlock it.
  sleep.sleep(10);
  console.log('You will see this message every 2 seconds ' + Date() );
  // do my stuff, free of interruptions
  // then, some time later, do:
  lockFile.unlock('some-file.lock', function (er) {
    // er means that an error happened, and is probably bad.
  })
});

}, null, true, null);

