
// dashboard.js


function report_populations () {
	$('#pred_0_pop').val(fauna.predators[0].bugs.length);
	$('#pred_1_pop').val(fauna.predators[1].bugs.length);
	$('#pred_2_pop').val(fauna.predators[2].bugs.length);
	$('#herb_0_pop').val(fauna.herbivores[0].bugs.length);
	$('#herb_1_pop').val(fauna.herbivores[1].bugs.length);
	$('#herb_2_pop').val(fauna.herbivores[2].bugs.length);
	$('#herb_3_pop').val(fauna.herbivores[3].bugs.length);
	$('#veg_0_pop').val(flora[0].current_level);
	$('#veg_1_pop').val(flora[1].current_level);
	$('#veg_2_pop').val(flora[2].current_level);
	$('#veg_3_pop').val(flora[3].current_level);
}

function swap_populations () { 
	if ($('#swapper').text() == 'actual populations') { 
		$('#swapper').text('target populations');
		$('#actual_populations').hide();
		$('#target_populations').show();
		$('#set').show();
		$('#pred_0_t').val(fauna.predators[0].target_population);
		$('#pred_1_t').val(fauna.predators[1].target_population);
		$('#pred_2_t').val(fauna.predators[2].target_population);
		$('#herb_0_t').val(fauna.herbivores[0].target_population);
		$('#herb_1_t').val(fauna.herbivores[1].target_population);
		$('#herb_2_t').val(fauna.herbivores[2].target_population);
		$('#herb_3_t').val(fauna.herbivores[3].target_population);
		$('#veg_0_t').val(flora[0].target_level);
		$('#veg_1_t').val(flora[1].target_level);
		$('#veg_2_t').val(flora[2].target_level);
		$('#veg_3_t').val(flora[3].target_level);
	} else {
		$('#swapper').text('actual populations');
		$('#actual_populations').show();
		$('#target_populations').hide();
		$('#set').hide();
	}
}


// functions referened below are in perturbations.js

function set_all_target_populations_from_dashboard () {

	SET = true;
	var new_predator_populations = [];
	var new_herbivore_populations = [];
	var new_vegetation_levels = [];
	for (var i=0; i<fauna.predators.length; i++) new_predator_populations.push(Number($('#pred_' + i + '_t').val()));
	for (var i=0; i<fauna.herbivores.length; i++) new_herbivore_populations.push(Number($('#herb_' + i + '_t').val()));
	update_all_bug_populations(new_predator_populations, new_herbivore_populations);
	for (var i=0; i<flora.length; i++) new_vegetation_levels.push(Number($('#veg_' + i + '_t').val()));
	update_all_vegetation_levels(new_vegetation_levels); 
}


// function set_target_populations () {
// 	SET = true;
// 	fauna.predators[0].target_population = Number($('#pred_0_t').val());
// 	fauna.predators[0].delta = Math.abs(fauna.predators[0].bugs.length - fauna.predators[0].target_population);

// 	// alert ('field contains: ' + $('#pred_0_t').val());
// 	fauna.predators[1].target_population = Number($('#pred_1_t').val());
// 	fauna.predators[2].target_population = Number($('#pred_2_t').val());
// 	fauna.herbivores[0].delta = Math.abs(fauna.herbivores[0].target_population - Number($('#herb_0_t').val()));
// 	fauna.herbivores[0].target_population = Number($('#herb_0_t').val());
// 	fauna.herbivores[1].target_population = Number($('#herb_1_t').val());
// 	fauna.herbivores[2].target_population = Number($('#herb_2_t').val());
// 	fauna.herbivores[3].target_population = Number($('#herb_3_t').val());
// 	flora[0].target_level = Number($('#veg_0_t').val());
// 	flora[1].target_level = Number($('#veg_1_t').val());
// 	flora[2].target_level = Number($('#veg_2_t').val());
// 	flora[3].target_level = Number($('#veg_3_t').val());


// }

function initialize_dashboard () {
	$('#frame_rate').val(FRAME_RATE);
	$('#grid_resolution').val(GRID_RESOLUTION);
	$('#no_move').val(PROBABILITY_NO_MOVE);
	$('#stay_on_food').val(PROBABILITY_STAY_ON_FOOD);
	$('#bug_size').val(UNIT_BUG_SIZE_PCT); 
	$('#unit_move').val(UNIT_BUG_MOVEMENT);
	$('#max_attention').val(MAX_ATTENTION);
	$('#effects_window').val(EFFECTS_WINDOW);
	$('#dying_duration').val(DYING_DURATION);
	$('#predation_duration').val(PREDATION_DURATION);
	$('#border_width').val(BORDER_WIDTH);
	$('#standard_predation_rate').val(STANDARD_PREDATION_RATE);
	$('#other_death_rate').val(OTHER_DEATH_RATE);
	$('#twitch').val(TWITCH);
	$('#unit_veg_size').val(UNIT_VEG_SIZE);
	$('#total_predations').val(TOTAL_PREDATIONS);
	$('#total_births').val(TOTAL_BIRTHS);
	$('#total_walkoffs').val(TOTAL_WALKOFFS);
}



