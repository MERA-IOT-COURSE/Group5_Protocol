var mqtt = require('mqtt');
var client = mqtt.connect('htpp://10.42.0.10:1883');

const Device = require('./device.js');

var msg = {
   "mid" : undefined,
   "data" :undefined
}

msg.mid = "REGISTER";
var device = new Device("Raspberry_Group5");
device.addAction("Led.ON");
device.addSensor("led.one_color");
device.addAction("Led.OFF");
device.addAction("sensor.temperature")

msg.data = device.getDevice();


console.log('Connected');
client.on('connect', function () {
  client.subscribe('init_master', function (err) {
    if (!err) {
      var strMessage = JSON.stringify(msg);
      client.publish('init_master', strMessage)
    } else {
      console.log(err);
    }
  })
})

client.on('init_master', function (topic, message) {
  // message is Buffer
  var msg = message.toString();
  var jsonMsg = JSON.parse(msg);
  console.log(jsonMsg);
  client.end()
})
