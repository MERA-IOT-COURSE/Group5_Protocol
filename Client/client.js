var mqtt = require('mqtt');

var client = mqtt.connect('http://127.0.0.1:5051');
//For Mera Classes
//var client = mqtt.connect('htpp://10.42.0.10:1883');

const Device = require('./device.js');

var msg = {
   "mid" : undefined,
   "data" :undefined
}

msg.mid = "REGISTER";
var device = new Device("Raspberry_Group5");
device.addSensor("led.one_color");
device.sensors[0].addAction("Led.OFF");
device.sensors[0].addAction("Led.ON");
device.addSensor("sensor.temperature");
device.sensors[1].addAction("sensor.temperature.get_temp");

device.addAction("pi.reboot");
device.addAction("pi.turn_off");

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
    //client.end()
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  var msg = message.toString();
  var jsonMsg = JSON.parse(msg);
  console.dir(jsonMsg);
  console.log();
  console.log();
 /* for (var i = 0; i < jsonMsg.data.sensors.length; i++) {
    console.dir(jsonMsg.data.sensors[i]);
}*/
  client.end()
})
