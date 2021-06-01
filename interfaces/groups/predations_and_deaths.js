

// predations_and_deaths.js

// these events do NOT affect population levels. whenever a predation
// or natural death occurs, we immediately birth a replacement bug
// these are strictly VISUAL features whose frequently can be set
// to the desired value in the species descriptors

var predation_table = [];

function predations () {
	if (!predation_debts()) return;
	for (var i=0; i<predation_table.length; i++) {
		for (var j=0; j<predation_table[i].length; j++){
			if (!fauna.predators[i].eats[j].producer) continue; 
			if (predation_table[i][j] > 0) {potential_predation(fauna.predators[i],fauna.herbivores[j]);}
		}
	}
}

function predation_debts () {
	var pending_predations = false;
	for (var i=0; i<fauna.predators.length; i++){
		if (fauna.predators[i].bugs.length == 0) continue;
		for (var j=0; j<fauna.herbivores.length; j++) {
			if (fauna.herbivores[j].bugs.length == 0) continue;
			if (!fauna.predators[i].eats[j].producer) continue;
			if (predation_table[i][j] > 0) pending_predations = true;
			if (Math.random() < (fauna.predators[i].eats[j].predations_per_hour / (FRAME_RATE*60*60))) { 
				predation_table[i][j]++; 
				pending_predations = true;
			}
		}
	}
	return (pending_predations);
}

function potential_predation (pred_species,herb_species) { //alert('here'); 
	for (var i=0; i<pred_species.bugs.length; i++){
		var pred = pred_species.bugs[i];
		for (var j=0; j<herb_species.bugs.length; j++) {
			var herb = herb_species.bugs[j];
			var d = Math.sqrt((pred.location.x - herb.location.x)**2 + (pred.location.y - herb.location.y)**2); 
			if (d < .01 && pred.state == 'moving' && herb.state == 'moving') { 
				predation_event(pred,herb);
				return; // maximum one predation per cycle per species 
			}
		}
	}
}

function build_predation_table () {
	for (var i=0; i<fauna.predators.length; i++) {
		predation_table[i] = [];
		for (var j=0; j<fauna.herbivores.length; j++) {
			predation_table[i].push(0);
		}
	}
}




function predation_event (pred,herb) { 
	$('#total_predations').val(++TOTAL_PREDATIONS);
	var p = pred.species;
	var h = herb.species;
	pred.state = 'eating herbivore';
	pred.countdown = Math.floor(PREDATION_DURATION * FRAME_RATE + 1);
	herb.state = 'being eaten';
	herb.countdown = Math.floor(DYING_DURATION * FRAME_RATE);
	predation_table[p][h]--;
}
function culling () {
	if (!CULLING) return;
	var species = UNDERPIPE.species;
	var troph = UNDERPIPE.troph;
	for (var i=fauna[troph][species].bugs.length-1; i>=0; i--) {
		var bug = fauna[troph][species].bugs[i];
		// line below needs to be cleaned up.
		if (Math.sqrt ( (UNDERPIPE.location.x*CANVAS_WIDTH+100 - (bug.location.x*CANVAS_WIDTH+16))**2 + (UNDERPIPE.location.y*CANVAS_HEIGHT+100 - (bug.location.y*CANVAS_HEIGHT+16))**2) < (COLONIZER_SIZE/2 - 32)) //hack
			{ fauna[troph][species].bugs.splice(i,1);}
	}
}
