var mongodb = require('mongodb');
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var BeDAO = function(){
  var self = this;
  this.tables = {};
  this.tables.config = "v1_config";
  this.tables.last = "v1_last";
  this.tables.raw = "v1_raw";
  this.tables.daily = "v1_daily";
  this.tables.hourly = "v1_hourly";
  
  this.db = new mongodb.Db(process.env.DB_NAME, new mongodb.Server(process.env.DB_HOST_NAME, parseInt(process.env.DB_PORT), {auto_reconnect: true, poolSize: 2}), {native_parser: false, w:1});
  
  console.log("opening "+ process.env.DB_USER_NAME+":"+ process.env.DB_PASSWORD+"@"+ process.env.DB_HOST_NAME + ":" + parseInt(process.env.DB_PORT) + "/"+process.env.DB_NAME)
  this.db.open(function(err, adb) {
		if(err) throw err;
		console.log(" * db opened()");
	 	self.adb = adb;
		adb.authenticate(process.env.DB_USER_NAME, process.env.DB_PASSWORD, function(err, result) {
			if(err) throw err;
			console.log(" * db authenticated()");
	 	 
		});
	});

};

BeDAO.prototype.getCollection= function(name, callback) {
  this.db.collection(name, function(error, my_collection) {
    if( error ) callback(error);
    else callback(null, my_collection);
  });
};

BeDAO.prototype.getSensors = function(callback){
	this.adb.collection(this.tables.config).find({type:"sensor",enabled:true}, {sort:"order"}).toArray(callback);
};

BeDAO.prototype.getActuators = function(callback){
	this.adb.collection(this.tables.config).find({type:"actuator",enabled:true}, {sort:"order"}).toArray(callback);
};

function mergeArray(array1,array2) {
  var ret = {};
  for(item in array1) {
    ret[item] = array1[item];
  }
  for(item in array2) {
    ret[item] = array2[item];
  }
  return ret;
}

BeDAO.prototype.onSample = function(measures, measuresActuators){
	
	var merged = mergeArray(measures,measuresActuators);
	
/*db.products.update( { sku: "abc123" },
                    { $set: {
                              quantity: 500,
                              instock: true
                            }
                    }
                  )*/	
				  
	var lastLogTs = measures.timestamp;
	
	for(var key in measures){
		var value = measures[key];
		if(key != "timestamp"){
			this.adb.collection(this.tables.last).update( { 'serie': key } , 
														  { $set : {'value': value, 'timestamp': lastLogTs} },
				function (err, inserted) {
					if(err) console.log("error:", err);
				}
			);
		}
	}
	
	for(var key in measuresActuators){
		var value = measuresActuators[key];
		if(key != "timestamp"){
			this.adb.collection(this.tables.last).update( { 'serie': key } , 
														  { $set : {'value': value, 'timestamp': lastLogTs} },
				function (err, inserted) {
					if(err) console.log("error:", err);
				}
			);
		}
	}
	
	//add the actuators only to raw collection?
	this.adb.collection(this.tables.raw).insert( merged ,
		function (err, inserted) {
			if(err) console.log("error:", err);
		}
	);

   var hour = new Date( measures.timestamp.getFullYear(), 
                                  measures.timestamp.getMonth(),
                                  measures.timestamp.getDate(), 
                                  measures.timestamp.getHours() );

   var day = new Date( measures.timestamp.getFullYear(),
                                  measures.timestamp.getMonth(),
                                  measures.timestamp.getDate() ); 
	
		var increment = {};
		for(var key in measures){
			var value = measures[key];
			if(key != "timestamp"){
				increment[key + '.sum' ] = parseFloat(value);
				increment[key + '.count' ] = 1;
			}
		}
			
		this.adb.collection(this.tables.hourly).update( { 'timestamp': hour }, { $inc: increment },  {upsert:true},
			function (err, inserted) {
				if(err) console.log("error:", err); 
			}
		);

		this.adb.collection(this.tables.daily).update( { 'timestamp': day }, { $inc: increment } , {upsert:true}, 
			function (err, inserted) {
				if(err) console.log("error:", err);
			}
		);
	

}

exports.BeDAO = new BeDAO();
