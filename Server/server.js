var mqtt = require('mqtt');

var broker = mqtt.connect('http://127.0.0.1:5051');
var response_message =
{
   "hw_id" : undefined,
   "response_status" : undefined
}
var messageFromRaspberry = {}
broker.on('connect', function () {
  broker.subscribe('init_master', function (err) {
     if (err) {
        throw Exception(err);
     } if (!err)
     {
     }
});
broker.subscribe('sensor_changed');
});

broker.on('message', function (topic, message) {
   var msg = message.toString();
   var json = JSON.parse(msg);
   messageFromRaspberry = json;
   console.log("got it:");
   console.log(messageFromRaspberry);
   if (topic == "init_master")
   {
   if (json.data.hw_id!= "")
      {
         response_message.hw_id = json.data.hw_id;
         response_message.response_status = "SuccessfullyConnected";
         console.log();
         console.log("Send it:");
         console.log(response_message);
         console.log();
         broker.publish('dev_' + messageFromRaspberry.data.hw_id, JSON.stringify(response_message) );
      }}

})
