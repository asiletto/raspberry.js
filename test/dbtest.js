var dbHostname = 'paulo.mongohq.com';
var dbPort = 10015;
var dbUsername = 'antmonitor';
var dbPassword = process.argv[2];
var dbName = 'antmonitor';

var mongodb = require('mongodb');
 
var db = new mongodb.Db(dbName, new mongodb.Server(dbHostname, dbPort, {auto_reconnect: true, poolSize: 8}), {native_parser: false, w:1});
 
db.open(function(err, db) {
	if(err) throw err;
	console.log(" * db opened()");
 
	db.authenticate(dbUsername, dbPassword, function(err, result) {
		if(err) throw err;
		console.log(" * db authenticated()");
 
		/* .... */
                insertSomeSamples(db);
		process.exit(0);
	});
});

function insertSomeSamples(db){

onSample({timestamp: new Date("2013-09-01 13:43:32.328833"), s1: 25, s2: 25.6, s3: 26, s4: 50}, db);
onSample({timestamp: new Date("2013-09-01 13:47:55.848785"), s1: 26, s2: 25.6, s3: 24, s4: 60}, db);
onSample({timestamp: new Date("2013-09-01 13:50:07.928764"), s1: 27, s2: 24.6, s3: 26, s4: 70}, db);
onSample({timestamp: new Date("2013-09-01 14:18:45.378700"), s1: 28, s2: 23.6, s3: 24, s4: 80}, db);
onSample({timestamp: new Date("2013-09-01 15:15:23.549321"), s1: 29, s2: 22.6, s3: 26, s4: 90}, db);
onSample({timestamp: new Date("2013-09-01 15:16:32.748691"), s1: 28, s2: 21.6, s3: 24, s4: 100}, db);

}

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
   db.collection("hourly").update( { 'timestamp': hour }, 
                                            { $inc: { 
                                                 's1_sum' : sample.s1,
                                                 's1_count' : 1, 
                                                 's2_sum' : sample.s2,
                                                 's2_count' : 1, 
                                                 's3_sum' : sample.s3,
                                                 's3_count' : 1, 
                                                 's4_sum' : sample.s4,
                                                 's4_count' : 1
                                              }
                                            }
                                          , 
                                          {upsert:true}, function (err, inserted) {
   if(err)
    console.log("error:", err);
} );  // Upsert = true 

     // upsert the daily document. 
   db.collection("daily").update( { 'timestamp': day }, 
                                            { $inc: { 
                                                 's1.sum' : sample.s1,
                                                 's1.count' : 1, 
                                                 's2.sum' : sample.s2,
                                                 's2.count' : 1, 
                                                 's3.sum' : sample.s3,
                                                 's3.count' : 1, 
                                                 's4.sum' : sample.s4,
                                                 's4.count' : 1
                                              }
                                            }
                                          , 
                                          {upsert:true}, function (err, inserted) {
   if(err)
    console.log("error:", err);
} ); // upsert = true 

     // save the raw sample                         
   db.collection("raw").insert( sample , function (err, inserted) {
   if(err)
    console.log("error:", err);
});

}
