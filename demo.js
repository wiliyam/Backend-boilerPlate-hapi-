


var geoip = require('geoip-lite');


var ip = "106.51.66.43";
var geo = geoip.lookup(ip);
 
console.log(geo);