
var NUTELLA = require('nutella_lib');

// Get configuration parameters and init nutella
var cliArgs = NUTELLA.parseArgs();
var componentId = NUTELLA.parseComponentId();
var nutella = NUTELLA.init(cliArgs.broker, cliArgs.app_id, cliArgs.run_id, componentId);

console.log(' groups-bot alive');

// BRAINSTORM BACK END

var groups = nutella.persist.getJsonObjectStore('groups');
groups.load();
// setInterval(connectivity_check, 60 * 1000); //HACK: interval between connectivity checks

// function connectivity_check() { 
// 	for (var i=map.participants.length - 1; i>=0; i--){
// 		if (Date.now() - map.participants[i].timestamp > 1.25 * 60 * 1000) {
// 			nutella.net.publish('participant_leaving', map.participants[i].name);
// 		}
// 	};	
// }

if (!groups.hasOwnProperty('data')) { 
//    map['participants'] = [];
	groups['data'] = 	[];
	groups['data'].push({timestamp: Date.now(), groups:[]})
    groups.save();
}

nutella.net.handle_requests('get_groups',function(message, from){ 
	return groups.data[groups.data.length-1].groups;
})

nutella.net.handle_requests('get_groups_history',function(message, from){
	return groups.data;
})

nutella.net.subscribe('set_groups',function(g){
	groups.data.push({timestamp: Date.now(), groups: g});
	groups.save();
	nutella.net.publish('groups_have_changed',g);
});



// END BRAINSTORM BACK END
