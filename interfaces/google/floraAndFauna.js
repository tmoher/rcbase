

// floraAndFauna.js

// these are our species

var flora = [
				{	name: "veg 0",
					target_level: 0,
					current_level: 0,
					image: {}
				},
				{	name: "veg 1",
					target_level: 0,
					current_level: 0,
					image: {}
				},
				{	name: "veg 2",
					target_level: 0,
					current_level: 0,
					image: {}
				},
				{	name: "veg 3",
					target_level: 0,
					current_level: 0,
					image: {}
				}
];


function unit_size (species) {
	return (unit_bug_size() * species.scale);
}

function screen_size (species) {
	return (unit_size(species) * min_dim());
}

var fauna = {	

		predators: [
						{	print_name: 'pred_0',
							image: {},
							bugs: [],
							eats: 	[ 	{producer: true, predations_per_hour: 6 * 60},  // one for each herbivore
										{producer: false, predations_per_hour: 10 * 6 * 60},
										{producer: false, predations_per_hour: 0},
										{producer: false, predations_per_hour: 1 * 60}
									],
							target_population: 50,
							deaths_per_hour: 1 * 60,
							initial_state: 'moving',
							frames: 4, 
							speed: 7, // moves average 5 BUG_MOVEMENT_SIZE distances
							scale: 1.5, // relative to UNIT_BUG_SIZE
							rotation: 0,
							delta: 0
						},
						{	print_name: 'pred_1',
							image: {},
							bugs: [],
							eats: 	[ 	{producer: false, predations_per_hour: 0},  // one for each herbivore
										{producer: false, predations_per_hour: 6 * 60},
										{producer: false, predations_per_hour: 0},
										{producer: false, predations_per_hour: 1 * 60}
									],
							target_population: 0,
							deaths_per_hour: 1 * 60,
							initial_state: 'moving',
							frames: 4, 
							speed: 5, // moves average 5 BUG_MOVEMENT_SIZE distances
							scale: 1, // relative to UNIT_BUG_SIZE
							rotation: 0,
							delta: 0
						},
						{	print_name: 'pred_2',
							image: {},
							bugs: [],
							eats: 	[ 	{producer: false, predations_per_hour: 0},  // one for each herbivore
										{producer: false, predations_per_hour: 0},
										{producer: true, predations_per_hour: 6 * 60},
										{producer: false, predations_per_hour: 0}
									],
							target_population: 0,
							deaths_per_hour: 1 * 60,
							initial_state: 'moving',
							frames: 1, 
							speed: 4, // moves average 5 BUG_MOVEMENT_SIZE distances
							scale: 1.6, // relative to UNIT_BUG_SIZE
							rotation: 0,
							delta: 0
						}
					],

		herbivores: [
						{	print_name: 'herb_0',
							image: {},
							bugs: [],
							eats: 	[ 	{producer: false},  // one for each herbivore
										{producer: true},
										{producer: true},
										{producer: true}
									],
							target_population: 100,
							deaths_per_hour: 1 * 60,
							initial_state: 'moving',
							frames: 4, 
							speed: 5, // moves average 5 BUG_MOVEMENT_SIZE distances
							scale: 1.2, // relative to UNIT_BUG_SIZE
							rotation: -Math.PI/2,
							delta: 0
						},
						{	print_name: 'herb_1',
							image: {},
							bugs: [],
							eats: 	[ 	{producer: true},  // one for each herbivore
										{producer: true},
										{producer: false},
										{producer: true}
									],
							target_population: 0,
							deaths_per_hour: 1 * 60,
							initial_state: 'moving',
							frames: 1, 
							speed: 5, // moves average 5 BUG_MOVEMENT_SIZE distances
							scale: 1, // relative to UNIT_BUG_SIZE
							rotation: -Math.PI,
							delta: 0
						},
						{	print_name: 'herb_2',
							image: {},
							bugs: [],
							eats: 	[ 	{producer: false},  // one for each herbivore
										{producer: false},
										{producer: true},
										{producer: true}
									],
							target_population: 0,
							deaths_per_hour: 1 * 60,
							initial_state: 'moving',
							frames: 1, 
							speed: 5, // moves average 5 BUG_MOVEMENT_SIZE distances
							scale: .5, // relative to UNIT_BUG_SIZE
							rotation: 0,
							delta: 0
						},
						{	print_name: 'herb_3',
							image: {},
							bugs: [],
							eats: 	[ 	{producer: true},  // one for each herbivore
										{producer: true},
										{producer: false},
										{producer: true}
									],
							target_population: 0,
							deaths_per_hour: 1 * 60,
							initial_state: 'moving',
							frames: 4, 
							speed: 5, // moves average 5 BUG_MOVEMENT_SIZE distances
							scale: 1, // relative to UNIT_BUG_SIZE
							rotation: 0,
							delta: 0
						}
					]
		}; // end fauna










//////////////////



























