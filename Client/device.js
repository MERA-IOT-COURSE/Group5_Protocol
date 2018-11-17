const Action = require('./action.js');
const Sensor = require('./sensor.js');
var hwidHelper = require('./uniqueIdHelper.js');

function generateHwid()
{
   var h_id = "4242"
   hwidHelper()
   .then((id) => {
     h_id = id
   })
   .catch((err) => {
     console.log(err)
   })
   return h_id;
}
class Device {

   constructor(deviceName)
   {
      this.version = "1.0";
      this.hw_id = generateHwid();
      this.sensors = [];
      this.deviceActions = [];
      this.name = deviceName;
   }

   addSensor(type)
   {
      var newSensor = new Sensor(type);
      this.sensors.push(newSensor);
   }
   addAction(actionName)
   {
      var newAction = new Action(actionName);
      this.deviceActions.push(newAction);
   }
   getDevice()
   {
         var resultActions = [];
         for(var i = 0; i < this.deviceActions.length; ++i)
         {
            resultActions.push(this.deviceActions[i].getAction());
         }

         var resultSensors = [];
         for(var i = 0; i < this.sensors.length ; ++i)
         {
            resultSensors.push(this.sensors[i].getSensor());
         }

         console.log(this);
         var sensor =
         {
            "version" : this.version,
            "hw_id" : this.hw_id,
            "sensors" : resultSensors,
            "actions" : resultActions,
            "name" : this.name
         }
         return sensor;
   }
}

module.exports = Device;
