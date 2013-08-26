var Jools = require('jools');

var rules = [
  {
    "name": "Lights on after 8pm",
    "condition": 
      function(hour) {
        return hour >= 8;
      }
    ,
    "consequence": 
      function() {
        this.state = "on";
      }
  }
];

var fact =  {
  "hour": 7,
  "minute": 21
};

var j = new Jools(rules);
var result = j.execute(fact);
console.log("Lights should be switched "+result.state);
