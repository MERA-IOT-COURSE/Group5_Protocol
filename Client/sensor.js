const Guid = require('guid');
const Action = require('./action.js')

class Sensor {

   constructor(type)
   {
      this.id = Guid.raw();
      this.type = "sensor.led";
      this.actions = [];
   }
   addAction(actionName)
   {
      var newAction = new Action(actionName);
      this.actions.push(newAction);
   }
   getSensor()
   {
      var resultActions = [];
      for(var i = 0; i < this.actions.length; ++i)
      {
         resultActions.push(this.actions[i].getAction());
      }

      var sensor =
      {
         "id" : this.id,
         "type" : this.type,
         "actions" : resultActions
      }
      return sensor;
   }
}

module.exports = Sensor;
