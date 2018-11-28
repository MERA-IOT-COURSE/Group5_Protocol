var gpio = require('onoff').Gpio;
var Moution = new gpio(18, 'in', 'both');
var Sensor = new require('./../sensor.js');


class MoutionSensor extends Sensor{

   constructor()
   {
      super("sensor.moution");
   }
   emitData(topic, data)
   {
      this.emit(topic, data);
   }
   subscribeToChanges()
   {
      var action = this;
      var data = {
         "sensor_id" : undefined,
         "value" : undefined,
         "ts" : undefined
      }
      Moution.watch(function() {
         var intResult = Moution.readSync();
         console.log(intResult);
         var result = Boolean(intResult);
         console.log(result);
         if (result)
            {
               data.sensor_id = action.id;
               data.value = "MoutionDetected";
               data.ts = Math.floor(new Date() / 1000);
               action.emit("sensorChanged", data);
            }
      });
}

   getDataObj()
   {

      data.sensor_id = this.id;
      data.value = "";
      data.ts = new Date().toString();
      console.log(data);

   }

}
//getValue();
module.exports = MoutionSensor;
