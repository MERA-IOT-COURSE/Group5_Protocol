var mqtt = require('mqtt')

// var client = mqtt.connect('http://127.0.0.1:5051');
// For Mera Classes
var client = mqtt.connect('htpp://10.42.0.10:1883')

// Sensors
var MoutionSensor = require('./sensors/moutionSensor.js')

const Device = require('./device.js')

var msg = {
  'mid': undefined,
  'data': undefined
}

function initSensorAction (sensor, actionName) {
  sensor.addAction(actionName)
}

function initDevice (name) {

}

msg.mid = 'REGISTER'
// Registration
var device = new Device('Group5_Raspberry')

device.init().then(() => {
  var moutionSensor = new MoutionSensor('sensor.moution')
  moutionSensor.addAction('b')
  moutionSensor.addAction('common.read')
  device.addSensor(moutionSensor)

  msg.data = device.getDevice()
  console.log('Connected')
  client.on('connect', function () {
    client.subscribe('dev_' + device.hw_id, function (err) {
      if (!err) {
        console.log(process.platform)
        var strMessage = JSON.stringify(msg)
        client.publish('init_master', strMessage)
      } else {
        console.log(err)
      }
    })
  })

// Get response from broker -> Set timeout for registration message
  client.on('message', function (topic, message) {
     // message is Buffer
    var msg = message.toString()
    var jsonMsg = JSON.parse(msg)
    console.dir(jsonMsg)
    console.log()
    console.log()
    client.end()
  })

  setInterval(() => {

  })
  var defaultSensor = device.sensors[0]

  console.log(defaultSensor)
  defaultSensor.on('sensorChanged', function (data) {
    msg.mid = 'SENSOR_DATA'
    msg.data = data
    var strMessage = JSON.stringify(msg)
    console.log(msg)
    client.publish('be_' + device.hw_id, strMessage)
  })

  defaultSensor.subscribeToChanges()
})
