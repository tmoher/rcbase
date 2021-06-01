
var NUTELLA = require('nutella_lib');

// Get configuration parameters and init nutella
var cliArgs = NUTELLA.parseArgs();
var componentId = NUTELLA.parseComponentId();
var nutella = NUTELLA.init(cliArgs.broker, cliArgs.app_id, cliArgs.run_id, componentId);

console.log(' chat-bot alive');

// BRAINSTORM BACK END

var chatlog = nutella.persist.getJsonObjectStore('chatlog');
chatlog.load();

if (!chatlog.hasOwnProperty('data')) {
    chatlog['data'] = [];
    chatlog.save();
}

nutella.net.subscribe('chat',function(m){
	var c = [];
	var t = Date.now();
	var chatters = m.chatters;
	for (var i=0; i<chatters.length; i++) {
		c[i] = chatters[i].name;
	}
	chatlog['data'].push ({timestamp: t, chatter: m.chatter, message: m.message, chatters:c});
	chatlog.save();
})

nutella.net.handle_requests('chat_history',function(message){ console.log('request for history');
	return chatlog.data;
})

nutella.net.handle_requests('get_chats',function(message){
	return chatlog.data.filter(function(item){return(item.timestamp >= message.start && item.timestamp <= message.end)});
})

