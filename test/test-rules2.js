var rules = [

{
    "name": "accendi RISCALDATORE se TEMP1 < 25",
    "condition":
      function(sensors) {
        for(var i=0;i<sensors.length;i++)
          if(sensors[i].name == "TEMP1")
            if(sensors[i].temp < 25)
                return true;
        return false;
      }
    ,
    "consequence":
      function() {
        if(this.changes==undefined)
          this.changes = {};
        this.changes["RISCALDATORE"] = "on";
      }
  },
   {
    "name": "spegni RISCALDATORE se TEMP1 > 27",
    "condition":
      function(sensors) {
        for(var i=0;i<sensors.length;i++)
          if(sensors[i].name == "TEMP1")
            if(sensors[i].temp > 27)
                return true;
        return false;
      }
    ,
    "consequence":
      function() {
        if(this.changes==undefined)
          this.changes = {};
        this.changes["RISCALDATORE"] = "off";
      }
  },
{
    "name": "accendi VENTOLA se TEMP1 > 27",
    "condition":
      function(sensors) {
        for(var i=0;i<sensors.length;i++)
          if(sensors[i].name == "TEMP1")
            if(sensors[i].temp > 27)
                return true;
        return false;
      }
    ,
    "consequence":
      function() {
        if(this.changes==undefined)
          this.changes = {};
        this.changes["VENTOLA"] = "on";
      }
  },
{
    "name": "spegni VENTOLA se TEMP1 <= 27",
    "condition":
      function(sensors) {
        for(var i=0;i<sensors.length;i++)
          if(sensors[i].name == "TEMP1")
            if(sensors[i].temp <= 27)
                return true;
        return false;
      }
    ,
    "consequence":
      function() {
        if(this.changes==undefined)
          this.changes = {};
        this.changes["VENTOLA"] = "off";
      }
  }


];

exports.rules = rules;
