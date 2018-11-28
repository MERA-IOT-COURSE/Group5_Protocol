var mqtt = require('mqtt');

var client = mqtt.connect('http://127.0.0.1:5051');
//For Mera Classes
//var client = mqtt.connect('htpp://10.42.0.10:1883');

//Sensors
var MoutionSensor = require('./sensors/moutionSensor.js');

const Device = require('./device.js');

var msg = {
   "mid" : undefined,
   "data" : undefined
}

msg.mid = "REGISTER";
//Registration
var device = new Device("Raspberry_Group5");
device.init().then(() => {

   var moutionSensor = new MoutionSensor("sensor.moution");
   device.addSensor(moutionSensor);
   moutionSensor.addAction("b");
   console.log(device.sensors[0].actions);
   device.sensors[0].addAction("common.read");

   msg.data = device.getDevice();
   console.log('Connected');
   client.on('connect', function () {
     client.subscribe('response_' + msg.data.hw_id, function (err) {
       if (!err) {
         console.log(process.platform);
         var strMessage = JSON.stringify(msg);
         client.publish('init_master', strMessage)
       } else {
         console.log(err);
       }
     })
   })
/*
   client.on('message', function (topic, message) {
     // message is Buffer
     var msg = message.toString();
     var jsonMsg = JSON.parse(msg);
     console.dir(jsonMsg);
     console.log();
     console.log();
     client.end()
   })
})
*/
var sensorType = "sensor.moution";
console.log(device.sensors[0]);
device.sensors[0].on('sensorChanged', function(data)    {
   msg.mid = "SENSOR_DATA";
   msg.data = data;
   var strMessage = JSON.stringify(msg);
   client.publish('sensor_changed', strMessage)
})
device.sensors[0].getCurValue();


})
