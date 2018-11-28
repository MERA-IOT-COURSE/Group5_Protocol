var events = require('events').EventEmitter;
var emitter = new events.EventEmitter();


emitter.on('newEvent', function(user) {
   console.log(user + 'Hello!');
});


emitter.emit('newEvent', 'qwetrty');
