var Jools = require('jools');

var rules = [
  {
    "name": "Accendi resistenza1 se temp1 < 25",
    "condition": 
      function(temp1) {
        return temp1 < 25;
      }
    ,
    "consequence": 
      function() {
        this.resistenza1 = "on";
      }
  },
  {
    "name": "Spegni resistenza1 se temp1 > 27",
    "condition":
      function(temp1) {
        return temp1 >= 27;
      }
    ,
    "consequence":
      function() {
        this.resistenza1 = "off";
      }
  },

];

var fact =  {
  "temp1": 15,
};

var j = new Jools(rules);
for (var i=0;i<50;i++){
  
  if(fact.resistenza1 == "on")
    fact.temp1 = fact.temp1 + 1;
  else
    fact.temp1 = fact.temp1 - 0.5;


  fact = j.execute(fact);

  console.log("Resistenza: "+fact.resistenza1+"\t Temperatura temp1: "+fact.temp1);
}
