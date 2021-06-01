

// advance.js

		// function advance() {
		// 	advance_species();
		// }

function advance_herbivores() {
	advance_bugs ('herbivores')
}

function advance_predators() {
	// if (SET) console.log(fauna.predators); 
	advance_bugs ('predators')
}

function advance_vegetation () {
	for (var i=0; i<flora.length; i++) {
		var species = flora[i]; 
		if (species.current_level < species.target_level) {
			species.current_level += Math.min(species.target_level-species.current_level,MAX_VEG_ALPHA_DELTA);
		} else if (species.current_level > species.target_level) {
			species.current_level -= Math.min(species.current_level-species.target_level,MAX_VEG_ALPHA_DELTA);
		}
	}
}

function advance_bugs (troph) {
	for (var i=0; i<fauna[troph].length; i++) {
		for (var j=0; j<fauna[troph][i].bugs.length; j++) {
			advance_bug (fauna[troph][i].bugs[j],j);
		}
//			if (SET && troph=='predators') console.log ('advanced predator bug  species:' + i + ' index:' + j);
	}	
}

function advance_bug(bug,index) { 
	var species = fauna[bug.troph][bug.species]; 
	if (bug.troph == 'herbivores' && bug.state == 'being eaten') { 
		if (--bug.countdown <= 0) { 
			species.bugs.splice(index,1);
			var b = new_bug('herbivores', bug.species, random_border_location()); 
			fauna.herbivores[bug.species].bugs.push(b); 
			$('#total_births').val(++TOTAL_BIRTHS); // restore the bug that was eaten for zero population effect
		} else twitch(bug);
		return;
	} 
	if (bug.troph == 'predators' && bug.state == 'eating herbivore') {
		if (--bug.countdown <= 0) {bug.state = 'moving'; bug.attention = 0;} 
		else twitch(bug);
		return;
	};
	if (bug.troph == 'herbivores' && hasFood(bug) && Math.random() < PROBABILITY_STAY_ON_FOOD) {	
		twitch(bug);
		return;		
	}
	if (Math.random() < PROBABILITY_NO_MOVE) {
		twitch(bug);
		return;
	} 
	set_next_bug_state (bug);
}

// function advance_bug(bug,index) { 
// 	var species = fauna[bug.troph][bug.species]; 
// 	if (bug.troph == 'herbivores' && bug.state == 'being eaten') { 
// 		if (--bug.countdown <= 0) { 
// 			species.bugs.splice(index,1);
// 			var b = new_bug('herbivores', bug.species, random_border_location()); 
// 			fauna.herbivores[bug.species].bugs.push(b); 
// 			$('#total_births').val(++TOTAL_BIRTHS); // restore the bug that was eaten for zero population effect
// 		} 
// 		else twitch(bug);
// 		return;
// 	} 
// 	if (bug.troph == 'predators' && bug.state == 'eating herbivore') {
// 		if (--bug.countdown <= 0) {bug.state = 'moving'; bug.attention = 0;} 
// 		else twitch(bug);
// 		return;
// 	};
// 	if (bug.troph == 'herbivores' && hasFood(bug) && Math.random() < PROBABILITY_STAY_ON_FOOD) {	
// 		twitch(bug);
// 		return;		
// 	}
// 	if (Math.random() < PROBABILITY_NO_MOVE) {
// 		twitch(bug);
// 		return;
// 	} 
// 	set_next_bug_state (bug);
// }


function set_next_bug_state (bug) { 
	// console.log('entering set bug state');
	var species = fauna[bug.troph][bug.species];
	var newX, newY;
	if (bug.attention == 0) {
		bug.heading =  bug.heading + (Math.random() - .5) * Math.PI/2;
		if (bug.heading > 2*Math.PI) bug.heading -= 2*Math.PI;	
		bug.attention = Math.floor((.1 + .9 * Math.random()) * MAX_ATTENTION) + 1;
		return;
	} else { // still attending to path
		var distance = Math.random() * species.speed * .2 * UNIT_BUG_MOVEMENT; 
		newX = bug.location.x + distance * Math.cos(bug.heading);
		newY = bug.location.y + distance * Math.sin(bug.heading);
		if (newX >= 0 && newX < 1 && newY >= 0 && newY < 1) {
			bug.location.x = newX;
			bug.location.y = newY;
			bug.attention--;
			return;
		}
	}
	// you get here if you have a bum location so get new random direction and distance
	do {
		bug.heading =  bug.heading + (Math.random() - .5) * Math.PI/2;
		if (bug.heading > 2*Math.PI) bug.heading -= 2*Math.PI;	
		var distance = Math.random() * species.speed * .2 * UNIT_BUG_MOVEMENT; 
		newX = bug.location.x + distance * Math.cos(bug.heading);
		newY = bug.location.y + distance * Math.sin(bug.heading);
		bug.attention = Math.floor((.1 + .9 * Math.random()) * MAX_ATTENTION) + 1;

	} while (!(newX >= 0 && newX < 1 && newY >= 0 && newY < 1));
	bug.attention--;
	bug.location.x = newX;
	bug.location.y = newY;
}



// 		var newX, newY;
// 		do {
// 			var distance = Math.random() * species.speed * .2 * UNIT_BUG_MOVEMENT; 
// 			newX = bug.location.x + distance * Math.cos(bug.heading);
// 			newY = bug.location.y + distance * Math.sin(bug.heading);
// 		}	while (! (newX >= 0 && newX < 1 && newY >= 0 && newY < 1));
// 		bug.location = {x: newX, y: newY};
// 	}





// 	if (bug.attention-- > 0) {
// 		var distance = Math.random() * species.speed * .2 * UNIT_BUG_MOVEMENT; 
// 		var deltaX = distance * Math.cos(bug.heading);
// 		var deltaY = distance * Math.sin(bug.heading);
// 		update_location = true;
// 		// bug.location = {x: newX, y: newY}; 
// 	}


// function set_next_bug_state (bug) { 
// 	// console.log('entering set bug state');
// 	var newX = 0;
// 	var newY = 0;
// 	var species = fauna[bug.troph][bug.species];
// 	var update_location = false;
// 	if (bug.attention-- > 0) {
// 		var distance = Math.random() * species.speed * .2 * UNIT_BUG_MOVEMENT; 
// 		var deltaX = distance * Math.cos(bug.heading);
// 		var deltaY = distance * Math.sin(bug.heading);
// 		newX = bug.location.x + deltaX;
// 		newY = bug.location.y + deltaY; 
// 		update_location = true;
// 		// bug.location = {x: newX, y: newY}; 
// 	}
// 	// while ( ! (newX >= 0 && newX < (1-BORDER_WIDTH/2) && newY >= 0 && newY < (1-BORDER_WIDTH/2))) { 

// 		// bug.attention = Math.floor((.1 + .9 * Math.random()) * MAX_ATTENTION); 
// 		// bug.heading =  bug.heading + (Math.random() - .5) * Math.PI/2;
// 		// if (bug.heading > 2*Math.PI) bug.heading -= 2*Math.PI;



// 	while ( ! (newX >= 0 && newX < 1 && newY >= 0 && newY < 1)) { 


// 		var deltaX = 2 * (Math.random() - 0.5) * species.speed * UNIT_BUG_MOVEMENT;
// 		var deltaY = 2 * (Math.random() - 0.5) * species.speed * UNIT_BUG_MOVEMENT; 
// 		newX = bug.location.x + deltaX;
// 		newY = bug.location.y + deltaY;
// 		bug.attention = Math.floor((.1 + .9 * Math.random()) * MAX_ATTENTION); 
// 		bug.heading =  Math.atan(deltaY/deltaX) * 2;
// 		// if (Math.random()<.5) bug.heading += Math.PI;
// 	};
// 	// while ( ! (newX > 0 && newX < (1-BORDER_WIDTH/2) && newY > 0 && newY < (1-BORDER_WIDTH/2))) {
// 	// 	var distance = Math.random() * species.speed * .2 * UNIT_BUG_MOVEMENT; 
// 	// 	bug.heading = Math.random * 2 * Math.PI - Math.PI;		
// 	// 	var deltaX = distance * Math.cos(bug.heading);
// 	// 	var deltaY = distance * Math.sin(bug.heading);
// 	// 	newX = bug.location.x + deltaX;
// 	// 	newY = bug.location.y + deltaY; 
// 	// 	bug.attention = Math.floor((.1 + .9 * Math.random()) * MAX_ATTENTION); 
// 	// 	// if (Math.random()<.5) bug.heading += Math.PI;
// 	// };
// 	// bug.location = {x: newX, y: newY}; 
// 	if (update_location) bug.location = {x: newX, y: newY}; 
// 	// console.clear();
// };

function twitch(bug) {
	bug.heading =  bug.heading + (Math.random() - .5) * Math.PI/4;
	// delta = 2 * (Math.random()-0.5) * Math.PI/18;
	// bug.heading += delta;
	// if (bug.heading > Math.PI) bug.heading = -Math.PI + delta;
	// if (bug.heading < -Math.PI) bug heading = 
}

	// HACK
	// this is a visual parameter, based on my perception. Lowering it makes
	// it more responsive the current vegetation level, so less obvious
	// clustering. Raising makes it less responsive, so you get clustering
	// no matter what the vegetation level is. 

var CLUSTERING_FACTOR = .2;

function hasFood(bug){ //if (bug.location.x > 1 || bug.location.y > 1 ) alert('yo2');
	if (bug.troph != 'herbivores') return false;
	var x = Math.floor(bug.location.x * GRID_RESOLUTION);
	var y = Math.floor(bug.location.y * GRID_RESOLUTION);	
	// if (x < 0 || x >(GRID_RESOLUTION-1)) {alert('x problem: ' + x); return;}
	// if (y < 0 || y >(GRID_RESOLUTION-1)) {alert('y problem: ' + y); return;}
	var food = grid[y][x] - 1;
	if (food == -1 || flora[food].current_level == 0) return false;

	if (Math.random() < CLUSTERING_FACTOR && Math.random() > flora[food].current_level/7) return false;
	// console.log(fauna.herbivores[bug.species]);
	return (fauna.herbivores[bug.species].eats[food].producer);
}



