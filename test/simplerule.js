var rules = [
  {
    "name": "debug rule",
    "condition": 
      function(sensors) {
        console.log("condition: function(sensors)= ",sensors);
        return true;
      }
    ,
    "consequence": 
      function() {
        if(this.changes==undefined)
          this.changes = {};
        this.changes["VENTOLA"] = "pippo";
      }
  }

];

exports.rules = rules;
