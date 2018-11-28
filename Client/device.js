const Action = require('./action.js');
const Sensor = require('./sensor.js');
var hwidHelper = require('./uniqueIdHelper.js');

class Device {

   constructor(deviceName)
   {
      this.version = "1.0";
      this.hw_id = "12345";
      this.sensors = [];
      this.deviceActions = [];
      this.name = deviceName;
   }
   init()
   {
      return new Promise((resolve, reject) => {
         hwidHelper()
         .then((id) => {
           this.hw_id = id;
           resolve();
         })
         .catch((err) => {
           this.hw_id = "12345";
           //console.log(err)
           resolve();
         })

      })
   }
   //
   addSensor(sensor)
   {
      this.sensors.push(sensor);
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
