const Guid = require('guid');

class Action {

   constructor(actionName)
   {
      this.id = Guid.raw();
      this.name = actionName;
   }

   getAction()
   {
      var action =
      {
         "id": this.id,
         "name" : this.name
      }
      return action
   }

}

module.exports = Action;
