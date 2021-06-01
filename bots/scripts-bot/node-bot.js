
var NUTELLA = require('nutella_lib');

// Get configuration parameters and init nutella
var cliArgs = NUTELLA.parseArgs();
var componentId = NUTELLA.parseComponentId();
var nutella = NUTELLA.init(cliArgs.broker, cliArgs.app_id, cliArgs.run_id, componentId);

console.log(' scripts-bot alive');

// BRAINSTORM BACK END

var brainstorms = nutella.persist.getJsonObjectStore('brainstorms');
brainstorms.load();

if (!brainstorms.hasOwnProperty('data')) {
    brainstorms['data'] = [];
    brainstorms.save();
    nutella.net.request('new_brainstorm','demo', function(){});
}


nutella.net.handle_requests('new_brainstorm',function(name){
	for (var i=0; i<brainstorms.data.length; i++){
		if (name == brainstorms.data[i].name) {			
			return 'duplicate name';
		}
	}
	brainstorms.data.push({name: name, items:[]});
	brainstorms.save();
	return 'success';
});

nutella.net.handle_requests('set_brainstorm',function(message){
	for (var i=0; i<brainstorms.data.length; i++){
		if (message.name == brainstorms.data[i].name) {
			brainstorms.data[i].items = [];
			brainstorms.data[i].items = message.items;
			brainstorms.save();
			nutella.net.publish('brainstorm_push',brainstorms.data[i]);
			return 'success';
		}
	}
	return 'name not found';
});

nutella.net.handle_requests('get_brainstorm',function(name){
	for (var i=0; i<brainstorms.data.length; i++){
		if (name == brainstorms.data[i].name) {
			return (brainstorms.data[i].items);
		}
	}
	return 'name not found';
});

nutella.net.subscribe('delete_brainstorm',function(name){ 
	for (var i=0; i<brainstorms.data.length; i++){
		if (name == brainstorms.data[i].name) {
			// this is the one to delete
			brainstorms.data.splice(i,1);
			brainstorms.save();
			return;
		}
	}
});

nutella.net.handle_requests('get_brainstorms',function(){
	var result = [];
	for (var i=0; i<brainstorms.data.length; i++){
		result [i] = brainstorms.data[i].name;
	}
	return result;
});


// END BRAINSTORM BACK END
