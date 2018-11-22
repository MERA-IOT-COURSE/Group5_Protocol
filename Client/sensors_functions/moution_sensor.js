var gpio = require('onoff').Gpio;
var Moution = new gpio(18, 'in', 'both');

class MoutionSensor{
getValue()
{
Moution.watch(function(){
var date = new Date();
console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
   var intResult = Moution.readSync();
   console.log(intResult);
   var result = Boolean(intResult);
   console.log(result);
    return result;
});
}
}
module.exports = new MoutionSensor();
