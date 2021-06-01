
var NUTELLA = require('nutella_lib');

// Get configuration parameters and init nutella
var cliArgs = NUTELLA.parseArgs();
var componentId = NUTELLA.parseComponentId();
var nutella = NUTELLA.init(cliArgs.broker, cliArgs.app_id, cliArgs.run_id, componentId);

console.log(' map-bot alive');

// BRAINSTORM BACK END

var map = nutella.persist.getJsonObjectStore('map');
map.load();
setInterval(connectivity_check, 60 * 1000); //HACK: interval between connectivity checks

function connectivity_check() { 
	for (var i=map.participants.length - 1; i>=0; i--){
		if (Date.now() - map.participants[i].timestamp > 1.25 * 60 * 1000) {
			nutella.net.publish('participant_left', map.participants[i].name);
		}
	};	
}

if (!map.hasOwnProperty('participants')) { 
//    map['participants'] = [];
	map['participants'] = 	[];
    map.save();
}

nutella.net.handle_requests('get_participants',function(message, from){ 
	return map.participants;
})

nutella.net.subscribe('update_participant',function(participant){
	var found = false;
	for (var i=0; i<map.participants.length; i++){
		if (map.participants[i].name == participant.name) {
			var t = map.participants[i].timestamp;			
			map.participants[i] = participant; 
			map.participants[i].timestamp = t;
			// map.participants[i].current_location.x = map.participants[i].destination_location.x;
			// map.participants[i].current_location.y = map.participants[i].destination_location.y;
			found = true;
		}
	};
	if (!found) { 
		var p = participant;
		p.timestamp = Date.now();
		map.participants.push(p);
	}
	map.save();
	// participant.current_location = participant.destination_location;
	nutella.net.publish('updated_participant', participant);
});

nutella.net.subscribe('participant_left',function(name){
	for (var i=0; i<map.participants.length; i++){
		if (map.participants[i].name == name) {			
			map.participants.splice(i,1); 
		}
	};
	map.save();
	console.log(map.participants);
});

nutella.net.subscribe('still_in_room',function(args){
	var portal = args.portal;
	var name = args.name;
	for (var i=0; i<map.participants.length; i++){
		if (map.participants[i].name == name) {			//HACK. also needs to check portal
			 map.participants[i].timestamp = Date.now();
		}
	};
	map.save();
});



// END BRAINSTORM BACK END
