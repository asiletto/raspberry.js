var DHT22 = require('../lib/DHT22').DHT22;
var DS18B20 = require('../lib/DS18B20').DS18B20;

var s1 = new DHT22('52284131a7b28cedb4000036', 's4','s5', 18);
var s2 = new DS18B20('5225d1419addc0ba4600001f', 's1', 'test/temp1.txt');

console.log("res1:", s1.read());
console.log("res2:", s2.read());
