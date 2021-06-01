
// births_and_walkoffs.js

// these events do affect population levels. whenever a change in
// population occurs within a species, that species delta is set.
// delta = Math.abs(old population - new population).
// this amortizes the change in population over the EFFECTS WINDOW




// births

function births () {
	for (var i=0; i<fauna.predators.length; i++) potential_birth('predators', i);
	for (var i=0; i<fauna.herbivores.length; i++) potential_birth('herbivores', i);		
}

function potential_birth (troph,index) { 
// console.log('troph '); 
// console.log(fauna[troph][index]);//e.g., births(fauna.predators[0])
	var species = fauna[troph][index];
	if (species.target_population <= species.bugs.length) return;
	var steps = FRAME_RATE * 60 * 60 * EFFECTS_WINDOW; // steps during the effects window (effects window = # hours)
	// console.log(species.delta);
	if (species.delta > 0 && steps > 0 && Math.random() >= species.delta/steps) return; //if (SET) alert('here');
	 // need more of this species

	var bug = new_bug(troph, index, random_border_location()); 
	// console.log('bug'); console.log(bug);
	fauna[troph][index].bugs.push(bug);
	$('#total_births').val(++TOTAL_BIRTHS);
	// console.log('predator array');
	// console.log(fauna.predators[0].bugs[0]); // restore the bug that was eaten for zero population effect
}



// walkoffs


function walkoffs () {
	for (var i=0; i<fauna.predators.length; i++) potential_walkoff(fauna.predators[i]);
	for (var i=0; i<fauna.herbivores.length; i++) potential_walkoff(fauna.herbivores[i]);		
}

function potential_walkoff (species) {
	if (species.target_population >= species.bugs.length) return;
	var steps = FRAME_RATE * 60 * 60 * EFFECTS_WINDOW; // steps during the effects window (effects window = # hours)
	if (species.delta > 0 && steps > 0 && Math.random() >= species.delta/steps) return;
	for (var i=0; i<species.bugs.length; i++){
		var l = species.bugs[i].location;
		if (l.x < BORDER_WIDTH/3 || l.y < BORDER_WIDTH/3 || l.x > (1 - BORDER_WIDTH/3) || l.y > (1 - BORDER_WIDTH/3)) { //we have a candidate
				remove_bug(species.bugs[i],i);
				$('#total_walkoffs').val(++TOTAL_WALKOFFS);

				return; // max one walkoff per species per frame
		}
	}
}












