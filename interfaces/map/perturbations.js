

// perturbations.js


function update_bug_population (species, new_population) {
	species.target_population = new_population;
	species.delta = Math.abs(new_population - species.bugs.length);
}

function update_bug_tropic_level_populations (troph, new_populations) {
	for (var i=0; i<troph.length; i++) update_bug_population(troph[i],new_populations[i]);
}

function update_all_bug_populations (new_predator_populations, new_herbivore_populations) {
	update_bug_tropic_level_populations (fauna.predators, new_predator_populations);
	update_bug_tropic_level_populations (fauna.herbivores, new_herbivore_populations);
}

function update_vegetation_level (species, new_level) {
	species.target_level = new_level;
	if (INITIALIZING) species.current_level = new_level;
}

function update_all_vegetation_levels (new_vegetation_levels) { 
	for (var i=0; i<flora.length; i++) update_vegetation_level (flora[i],new_vegetation_levels[i]);

}

const LEGACY_TABLE =	[ 	{troph:'herbivores',species:0},
							{troph:'predators',species:0},
							{troph:'herbivores',species:1},
							{troph:'predators',species:1},
							{troph:'vegetation',species:0},
							{troph:'vegetation',species:1},
							{troph:'herbivores',species:2},
							{troph:'herbivores',species:3},
							{troph:'predators',species:2},
							{troph:'vegetation',species:2},
							{troph:'vegetation',species:3}
						];


nutella.net.subscribe('state_update',function(populations){
	// alert('got an update');
	update_all_populations(populations); 
});

nutella.net.subscribe('colonize', function(response) {// response = {ecosystem,species}
	if (response.ecosystem != ECOSYSTEM) return;
	UNDERPIPE = {
					type: 'colonize',
					troph: LEGACY_TABLE[response.species].troph,
					species: LEGACY_TABLE[response.species].species,
					curStep : UNDERPIPE_STEPS,
					trigger: true,
					location: {	x: BORDER_WIDTH + Math.random() * (1 - 4 * BORDER_WIDTH), 
								y: BORDER_WIDTH + Math.random() * (1 - 4 * BORDER_WIDTH)}
				}
});



nutella.net.subscribe('trap', function(response) {// response = {ecosystem,species}
	if (response.ecosystem != ECOSYSTEM) return;
	UNDERPIPE = {
					type: 'trap',
					troph: LEGACY_TABLE[response.species].troph,
					species: LEGACY_TABLE[response.species].species,
					curStep : UNDERPIPE_STEPS,
					trigger: true,
					location: {	x: BORDER_WIDTH + Math.random() * (1 - 4 * BORDER_WIDTH), 
								y: BORDER_WIDTH + Math.random() * (1 - 4 * BORDER_WIDTH)}
				}
});

// nutella.net.request('last_state', {}, function(populations) {
// 	update_all_populations(populations);
// });

function update_all_populations(new_populations){ 

	// these 'factors' are the linear constants that you multiply by
	// the values coming from nutella to get your actual target population

	var v_factor = .1;
	var p_factor = 100;
	var h_factor = 100;


	var vegetation_levels = [];
	var herbivore_populations = [];
	var predator_populations = [];
	var populations = new_populations.biotic[ECOSYSTEM];

	// convert from legacy indexes
	
	for (var i=0; i<LEGACY_TABLE.length; i++) { 
		switch (LEGACY_TABLE[i].troph) {
			case 'vegetation': 	vegetation_levels.push(populations[i] * v_factor); break;
			case 'predators':   predator_populations.push(Math.floor(populations[i] * p_factor)); break;
			case 'herbivores':  herbivore_populations.push(Math.floor(populations[i] * h_factor)); break;
		}	
	}

	update_all_bug_populations(predator_populations,herbivore_populations);
	update_all_vegetation_levels(vegetation_levels);
	console.log(vegetation_levels);

};

