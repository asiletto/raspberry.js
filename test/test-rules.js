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

module.exports.rules = rules;
