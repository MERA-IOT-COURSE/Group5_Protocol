
var gpio = require('onoff').Gpio;
var Moution = new gpio(18, 'in', 'both');
var Sensor = new require('./../sensor.js');


class MoutionSensor extends Sensor{

   getValue()
   {

      Moution.watch(function() {
            var intResult = Moution.readSync();
            console.log(intResult);
            var result = Boolean(intResult);
            console.log(result);
            if (result)
            {
               this.value = result;
               this.emit('moutionChanged',this, this.value);
               Moution.unwatch();
            }
         });


}

   getDataObj()
   {
      var data = {
         "sensor_id" : undefined,
         "value" : undefined,
         "ts" : undefined
      }

      data.sensor_id = this.id;
      data.value = "";
      data.ts = new Date().toString();
      console.log(data);

   }

}
getValue();
module.exports = MoutionSensor;
