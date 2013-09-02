var dbHostname = 'paulo.mongohq.com';
var dbPort = 10015;
var dbUsername = 'antmonitor';
var dbPassword = 'xxxxxxx';
var dbName = 'antmonitor';

var cronJob = require('cron').CronJob;
var mongodb = require('mongodb');
var fs = require('fs');
 
var db = new mongodb.Db(dbName, new mongodb.Server(dbHostname, dbPort, {auto_reconnect: true, poolSize: 8}), {native_parser: false, w:1});
 
db.open(function(err, db) {
	if(err) throw err;
	console.log(" * db opened()");
 
	db.authenticate(dbUsername, dbPassword, function(err, result) {
		if(err) throw err;
		console.log(" * db authenticated()");

		new cronJob('0 * * * * *', function(){

		t1 = readTempDS1820('/sys/bus/w1/devices/28-00000489b41e/w1_slave');
		t2 = readTempDS1820('/sys/bus/w1/devices/28-00000489ba05/w1_slave');
		t3 = readTempDS1820('/sys/bus/w1/devices/28-0000048d5401/w1_slave');
		time = new Date();
		
		onSample({'timestamp':time, 's1':t1, 's2':t2, 's3':t3},db);
		
		}, null, true, null);
		
	});
});

function readTempDS1820(file){
  var buffer = fs.readFileSync(file);
  var data = buffer.toString('ascii').split(" "); // Split by space
  var degree  = parseFloat(data[data.length-1].split("=")[1])/1000.0;
  degree = Math.round(degree * 10) / 10;
  return degree;
};

function onSample(sample, db) { 

    // Get the year, month, day, and hour of the sample 
   var hour = new Date( sample.timestamp.getFullYear(), 
                                  sample.timestamp.getMonth(),
                                  sample.timestamp.getDate(), 
                                  sample.timestamp.getHours() );

    // Get the year, month, and day of the sample 
   var day = new Date( sample.timestamp.getFullYear(),
                                  sample.timestamp.getMonth(),
                                  sample.timestamp.getDate() ); 

    // Upsert the hourly document                         
   db.collection("v1_hourly").update( { 'timestamp': hour }, 
                                            { $inc: { 
                                                 's1.sum' : sample.s1,
                                                 's1.count' : 1, 
                                                 's2.sum' : sample.s2,
                                                 's2.count' : 1, 
                                                 's3.sum' : sample.s3,
                                                 's3.count' : 1
                                              }
                                            }
                                          , 
                                          {upsert:true}, function (err, inserted) {
   if(err)
    console.log("error:", err);
} );  // Upsert = true 

     // upsert the daily document. 
   db.collection("v1_daily").update( { 'timestamp': day }, 
                                            { $inc: { 
                                                 's1.sum' : sample.s1,
                                                 's1.count' : 1, 
                                                 's2.sum' : sample.s2,
                                                 's2.count' : 1, 
                                                 's3.sum' : sample.s3,
                                                 's3.count' : 1
                                              }
                                            }
                                          , 
                                          {upsert:true}, function (err, inserted) {
   if(err)
    console.log("error:", err);
} ); // upsert = true 

     // save the raw sample                         
   db.collection("v1_raw").insert( sample , function (err, inserted) {
   if(err)
    console.log("error:", err);
});

}
