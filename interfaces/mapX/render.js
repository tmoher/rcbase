
// render.js



		// function render (){
		// 	draw_background();
		// 	draw_vegetation();
		// 	draw_herbivores();
		// 	draw_predators();
		// 	draw_underpipes();
		// 	draw_pipes();
		// 	draw_overpipes();
		// 	draw_border();
		// }

// var images = 	[ 	'pred_0', 'pred_1', 'pred_2', 
// 					'herb_0', 'herb_1', 'herb_2', 'herb_3', 
// 					'veg_0', 'veg_1', 'veg_2', 'veg_3',
// 					'bg','fg', 'pipes'
// 				]


// globals 



var FRAME_RATE = 10; // location updates per second
var PARTICIPANT_IMAGE_PCT = .01; // size of participant icon relative to screen height
var UNIT_MOVE_PCT = .10 / FRAME_RATE; // how far avatar moves every second

var LEFT_FOOT;
var RIGHT_FOOT;

function render_map() {
	ctx_map.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	for (var i=0; i<participants.length; i++) {
		if (!participants[i].visible && top.roomcast_portal().type != 'educator') continue;
		var p = participants[i];
		var x = p.current_location.x * CANVAS_WIDTH;
		var y = p.current_location.y * CANVAS_HEIGHT; 
		var name = p.name;
		ctx_map.fillStyle = "black";
		if (!participants[i].visible && top.roomcast_portal().type == 'educator') ctx_map.fillStyle = "lightgray";;		
		for (var j=0; j<top.chatters.length; j++){
			if (top.chatters[j].name == name) ctx_map.fillStyle = "teal";
		};
		var fudge = CANVAS_HEIGHT * .04;  //equivalent to 4vh, which for some reason craps out in next line.
		ctx_map.font = fudge + "px Arial";
		ctx_map.shadowOffsetX = 3;
		ctx_map.shadowOffsetY = 3;
		ctx_map.shadowColor = "LightSteelBlue";
		ctx_map.shadowBlur = 4;
		ctx_map.textAlign = 'center';
		ctx_map.fillText(name, x, y); 
	}
		// ctx_map.fillStyle = "blue";
		// ctx_map.font = "bold 3vh Arial";
		// ctx_map.shadowOffsetX = 3;
		// ctx_map.shadowOffsetY = 3;
		// ctx_map.shadowColor = "rgba (0,0,0,0.3)";
		// ctx_map.shadowBlur = 4;
		// ctx_map.fillText(name, x, y);
		// if (p.current_location.x != p.destination_location.x || p.current_location.y != p.destination_location.y) { 
		// 	var d = Math.sqrt ((p.current_location.x - p.destination_location.x)**2 + (p.current_location.y - p.destination_location.y)**2);
		// 	var e = .05; // how far the trailing footprints are
		// 	var h = p.destination_location.x - p.current_location.x;
		// 	var v = p.destination_location.y - p.current_location.y;
		// 	// var fx = x + 20 - (h * e / d) * CANVAS_WIDTH;
		// 	// var fy = y - 5 - (v * e / d) * CANVAS_HEIGHT;
		// 	var fx = x - (h * e / d) * CANVAS_WIDTH;
		// 	var fy = y - (v * e / d) * CANVAS_HEIGHT;
		// 	// var d = Math.sqrt ((p.current_location.x - p.destination_location.x)**2 + (p.current_location.y - p.destination_location.y)**2);
		// 	// var fx = x - 2 * (UNIT_MOVE_PCT*CANVAS_WIDTH / d) * (p.destination_location.x - p.current_location.x);
		// 	// var fy = y - 2 * (UNIT_MOVE_PCT*CANVAS_HEIGHT / d) * (p.destination_location.y - p.current_location.y);
		// 	var rotation = Math.PI/2 + Math.atan( (p.destination_location.y - p.current_location.y) / (p.destination_location.x - p.current_location.x));
		// 	// alert(rotation);
		// 	if (h<0) rotation += Math.PI; // dunno why
		// 	// 
		// 	var fs = {
		// 				type: p.southpaw,
		// 				alpha: 1.0,
		// 				location: p.southpaw ? {x: fx-VIRTUAL_FOOT_DIMENSIONS*min_dim(), y: fy} : {x: fx, y: fy}, //HACK
		// 				rotation: rotation
		// 	}

		// 	add_footstep(fs);

			// ctx_map.translate(fx, fy);
			// ctx_map.rotate(rotation); 
			// var time = Date.now() % 1000;
			// if (time <= .25 * 1000) {
			// 	var foot_dimensions = {width: .02 * min_dim(), height: .05 * min_dim()};
			// 	ctx_map.drawImage(LEFT_FOOT,0,0,LEFT_FOOT.naturalWidth,LEFT_FOOT.naturalHeight,-foot_dimensions.width,0,foot_dimensions.width,foot_dimensions.height);
			// 	// ctx_map.globalAlpha = .5;
			// 	// ctx_map.drawImage(RIGHT_FOOT,0,0,RIGHT_FOOT.naturalWidth,RIGHT_FOOT.naturalHeight,10,-30,10,25); 
			// 	// ctx_map.globalAlpha = 1;
			// } else if (time <= .5 * 1000){ 
			// 	ctx_map.globalAlpha = .5;
			// 	ctx_map.drawImage(LEFT_FOOT,0,0,LEFT_FOOT.naturalWidth,LEFT_FOOT.naturalHeight,-foot_dimensions.width,0,foot_dimensions.width,foot_dimensions.height);
			// 	ctx_map.globalAlpha = 1;
			// 	ctx_map.drawImage(RIGHT_FOOT,0,0,RIGHT_FOOT.naturalWidth,RIGHT_FOOT.naturalHeight,0,0,foot_dimensions.width,foot_dimensions.height);
			// } else if (time <= .75 * 1000) {
			// 	ctx_map.drawImage(RIGHT_FOOT,0,0,RIGHT_FOOT.naturalWidth,RIGHT_FOOT.naturalHeight,0,0,foot_dimensions.width,foot_dimensions.height);
			// } else {
			// 	ctx_map.drawImage(LEFT_FOOT,0,0,LEFT_FOOT.naturalWidth,LEFT_FOOT.naturalHeight,-foot_dimensions.width,0,foot_dimensions.width,foot_dimensions.height);
			// 	ctx_map.globalAlpha = .5;
			// 	ctx_map.drawImage(RIGHT_FOOT,0,0,RIGHT_FOOT.naturalWidth,RIGHT_FOOT.naturalHeight,0,0,foot_dimensions.width,foot_dimensions.height);
			// 	ctx_map.globalAlpha = 1;
			// };
			// ctx_map.rotate(-rotation);
			// ctx_map.translate(-fx, -fy);
			// if (d < UNIT_MOVE_PCT) {
			// 	current.x = destination.x; current.y = destination.y;
			// } else {
			// 	current.x = current.x + (UNIT_MOVE_PCT / d) * (destination.x - current.x);
			// 	current.y = current.y + (UNIT_MOVE_PCT / d) * (destination.y - current.y);
			// }
			// alert(x + ' ' + y + ' ' + fx + ' ' + fy);


	render_publics();
};

var FOOTSTEPS = [];
var VIRTUAL_FOOT_DIMENSIONS = {width: .02, height: .05}

function min_dim () {
	return(Math.min(CANVAS_WIDTH,CANVAS_HEIGHT));
}

function step_feet() { 
	ctx_footsteps.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	for (var i=0; i<participants.length; i++){
		var p = participants[i];
		if (!p.visible && top.roomcast_portal().type != 'educator') continue;
		p.southpaw = !p.southpaw;
		if (p.current_location.x != p.destination_location.x || p.current_location.y != p.destination_location.y) { 

		// add footstep

			var d = Math.sqrt ((p.current_location.x - p.destination_location.x)**2 + (p.current_location.y - p.destination_location.y)**2);
			var e = .05; // how far the trailing footprints are HACK
			var h = p.destination_location.x - p.current_location.x;
			var v = p.destination_location.y - p.current_location.y;
			var fx = (p.current_location.x - (h * e / d)) * CANVAS_WIDTH;
			var fy = (p.current_location.y - (v * e / d)) * CANVAS_HEIGHT;
			var rotation = Math.PI/2 + Math.atan( (p.destination_location.y - p.current_location.y) / (p.destination_location.x - p.current_location.x));
			if (h<0) rotation += Math.PI; // dunno why
			rotation = rotation - (2 * (2 * Math.PI) / 360); //rotate slightly back left. HACK
			var fs = {
						type: p.southpaw ? 'left' : 'right',
						alpha: 1.0,
						location: p.southpaw ? {x: fx, y: fy} : {x: fx, y: fy}, //HACK
						rotation: rotation
			}
			FOOTSTEPS.push(fs);
		}
	}

	// if (FOOTSTEPS.length > 0) {console.log('FOOTSTEPS');console.log(FOOTSTEPS[0]);}

	// show footsteps

	var fd = {width: VIRTUAL_FOOT_DIMENSIONS.width * min_dim(), height: VIRTUAL_FOOT_DIMENSIONS.height * min_dim()}; 
	for (var i=0; i<FOOTSTEPS.length; i++) {
		var f = FOOTSTEPS[i];
		ctx_footsteps.globalAlpha = f.alpha;
		ctx_footsteps.translate(f.location.x, f.location.y);
		ctx_footsteps.rotate(f.rotation); 
		var img = (f.type == 'left') ? LEFT_FOOT : RIGHT_FOOT;
		if (f.type == 'left') ctx_footsteps.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,-fd.width,0,fd.width,fd.height);
		if (f.type == 'right') ctx_footsteps.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,+fd.width,0,fd.width,fd.height);
		ctx_footsteps.rotate(-f.rotation); 
		ctx_footsteps.translate(-f.location.x, -f.location.y);
		ctx_footsteps.globalAlpha = 1;
	}
	
	// fade footsteps for next cycle

	for (var i=FOOTSTEPS.length-1; i>=0; i--) {
		FOOTSTEPS[i].alpha -= .18; //HACK
		if (FOOTSTEPS[i].alpha <= 0) FOOTSTEPS.splice(i,1);
	}
}



var ARRIVAL = false;

function update_locations () {
	if (ARRIVAL) {ARRIVAL = false; update_resources(); update_chat();}
	for (var i=0; i<participants.length; i++) {
		var p = participants[i];
		var current = p.current_location;
		var destination = p.destination_location;
		if (current.x != destination.x || current.y != destination.y) {
			var d = Math.sqrt ((current.x - destination.x)**2 + (current.y - destination.y)**2);
			if (d < UNIT_MOVE_PCT) {
				current.x = destination.x; current.y = destination.y;
				if (p.name == top.individual_name().printName) ARRIVAL = true;
				update_chat();
			} else {
				current.x = current.x + (UNIT_MOVE_PCT / d) * (destination.x - current.x);
				current.y = current.y + (UNIT_MOVE_PCT / d) * (destination.y - current.y);
			}
			// alert (d + ' ' + current.x + ' ' + current.y);
		}
	}
}

var ctx_map;
var ctx_footsteps;
var BACKGROUND;

function build_context (id) {
	var canvas = document.getElementById(id);
	canvas.width = CANVAS_WIDTH; //currently broken, JS can't find global CANVAS_WIDTH
	canvas.height = CANVAS_HEIGHT; 
	var ctx = canvas.getContext("2d");
	return (ctx);
};

var DOOR;

function initialize_render() {
	ctx_map = build_context('map');
	ctx_footsteps = build_context('footsteps');
	$('#background_image').attr('src',BACKGROUND.src).height(CANVAS_HEIGHT).width(CANVAS_WIDTH);
	DOOR = {x: .48, y: .97};
	// DOOR.x += (Math.random()-.5) *2 * .05;
	// DOOR.y += (Math.random()-.5) *2 * .05;

	var my_name = top.individual_name().printName;
	// nutella.net.publish ('participant_left',my_name);
	var participant  = {        
								southpaw: (Math.random() < .5),
								current_location: {x:DOOR.x,y:DOOR.y},
								destination_location: {x:DOOR.x,y:DOOR.y}, 
								name: my_name
							 };
	var found = false;
	for(var i=0; i<participants.length; i++) {
		if (participants[i].name == my_name){
			participants[i] = participant; found = true;
		}
	}
	if (!found) participants.push(participant);
	participant.visible = true;
	// nutella.net.publish ('update_participant',participant);
}


function preloadImages(callback) { 

	var images = ['background','left_foot','right_foot'];
    var img;
    var remaining = images.length;
    for (var i = 0; i < images.length; i++) {
        img = new Image();
        img.onload = function() {
            --remaining;
            if (remaining <= 0) {
                callback();
            }
        };
        img.src = images[i]+ '.png';
        switch (images[i]) {
        	case 'background': BACKGROUND = img;
        	case 'left_foot': LEFT_FOOT = img;
        	case 'right_foot': RIGHT_FOOT = img;
        }
    }
}

// $('#chat_text').on('mouseup', function (event){
// 	event.stopPropogation();
// });



$(window).on("mousedown", function (event){
	if (event.pageY > CANVAS_HEIGHT) return;
	var my_name = top.individual_name().printName;
	for (var i=0; i<participants.length; i++){
		if (participants[i].name == my_name) {
			participants[i] = {
								southpaw: (Math.random() < .5),
								current_location: {x:participants[i].current_location.x,y:participants[i].current_location.y},
								destination_location: {x:event.pageX/CANVAS_WIDTH,y:event.pageY/CANVAS_HEIGHT}, 
								name: my_name
							 }; 
			var visible = true;
			if (event.shiftKey && top.roomcast_portal().type == 'educator') visible = false;
			participants[i].visible = visible;
			// nutella.net.publish ('update_participant',participants[i]);
		};
	};
});

// nutella.net.subscribe ('update_participant',function(participant){
// 	for (var i=0; i< participants.length; i++) {
// 		var p = participants[i];
// 		if (p.name == participant.name) {
// 			participants[i] = participant; return;
// 		}
// 	}
// 	participants.push(participant);
// 	return;
// });

nutella.net.subscribe('updated_participant',function(participant){ 
	if (participant.name == top.individual_name().printName)return; 
	for (var i=0; i<participants.length; i++){
		if (participants[i].name == participant.name) {			
			participants[i] = participant; 
			return;
		}
	};
	participants.push(participant);
})

nutella.net.subscribe('participant_left',function(name){
	// if (name == top.individual_name().printName){
	// 	nutella.net.publish('updated_participant',participants[i]);
	// 	return;
	// }
	for (var i=0; i<participants.length; i++){
		if (participants[i].name == name){
			participants.splice(i,1);
			update_locations();
			return;
		}
	}
})


var publics = 	[
					{
						portal: 'eco',
						name: 1,
						location: {x: .7, y: .95}
					},
					{
						portal: 'eco',
						name: 2,
						location: {x: .3, y: .98}
					},
					{
						portal: 'eco',
						name: 3,
						location: {x: .05, y: .98}
					},
					{
						portal: 'eco',
						name: 4,
						location: {x: .05, y: .5}
					},
					{
						portal: 'eco',
						name: 5,
						location: {x: .05, y: .05}
					},
					{
						portal: 'mfw',
						name: 1,
						location: {x: .25, y: .05}
					}
					// ,
					// {
					// 	portal: 'phicon',
					// 	name: 1,
					// 	location: {x: .5, y: .5}
					// }
				];


function render_publics() {
	for (var i=0; i<publics.length; i++) {
		ctx_map.fillStyle = "maroon";
		ctx_map.font = "4vh Arial";
		ctx_map.shadowOffsetX = 3;
		ctx_map.shadowOffsetY = 3;
		ctx_map.shadowColor = "LightSteelBlue";
		ctx_map.shadowBlur = 3;
		ctx_map.textAlign = 'center';
		var namestring = publics[i].name; 
		if (publics[i].portal == 'mfw') namestring = ''; //hack
		ctx_map.fillText(publics[i].portal + ' ' + namestring, publics[i].location.x*CANVAS_WIDTH, publics[i].location.y*CANVAS_HEIGHT); 
	}
}

var AT = -1;

function update_resources() { 
    var my_loc ={x:0,y:0};
    for (var i=0; i<participants.length; i++){
      if (participants[i].name == top.individual_name().printName){
        my_loc = participants[i].current_location;
      }
    };
    // what's the closest public device?

    var min_d = 2;
    var closest_index; 

    for (var i=0; i<publics.length; i++){
      var d = Math.sqrt ((publics[i].location.x - my_loc.x)**2 + (publics[i].location.y - my_loc.y)**2);
      if (d < min_d) {min_d = d; closest_index = i;}
    }

 	// is it close enough?

 	if (min_d > PUBLIC_PROXIMITY_THRESHHOLD) {top.zap_public_resources(); AT = -1; top.PUBLIC_DEVICE_NAME = ''; return;}
 	if (AT == closest_index) return;
 	AT = closest_index;
 	top.PUBLIC_DEVICE_NAME = publics[closest_index].name;
 	top.PUBLIC_PORTAL = publics[closest_index].portal;
 	top.update_public_resources(publics[closest_index].portal,publics[closest_index].name);

}


var PUBLIC_PROXIMITY_THRESHHOLD = .05;

var PARTICIPANT_PROXIMITY_THRESHHOLD = .1;


function update_chat () {
    var me;
    for (var i=0; i<participants.length; i++){
      if (participants[i].name == top.individual_name().printName){
        me = i;
      }
    };

    top.chatters = [];
    for (var i=0; i<participants.length; i++){
    	if (me == i) continue;
    	var d = Math.sqrt ( (participants[i].current_location.x - participants[me].current_location.x)**2 + (participants[i].current_location.y - participants[me].current_location.y)**2);
      	if (d < PARTICIPANT_PROXIMITY_THRESHHOLD) top.chatters.push(participants[i]);
    };


    // what's the closest public device?

  //   var min_d = 2;
  //   var closest_index; 

  //   for (var i=0; i<publics.length; i++){
  //     var d = Math.sqrt ((publics[i].location.x - my_loc.x)**2 + (publics[i].location.y - my_loc.y)**2);
  //     if (d < min_d) {min_d = d; closest_index = i;}
  //   }
 	// // is it close enough?


 	// if (min_d > PUBLIC_PROXIMITY_THRESHHOLD) {top.zap_public_resources(); AT = -1; top.PUBLIC_DEVICE_NAME = ''; return;}
 	// if (AT == closest_index) return;
 	// AT = closest_index;
 	// top.PUBLIC_DEVICE_NAME = publics[closest_index].name;
 	// top.PUBLIC_PORTAL = publics[closest_index].portal;
 	// top.update_public_resources(publics[closest_index].portal,publics[closest_index].name);

}



function update_positions () {
	// participants = 		[
	// 						{current_location: {x:.7,y:.5},destination_location: {x:.2,y:.3}, name:"Joe"},
	// 						{current_location: {x:.3,y:.8},destination_location: {x:.3,y:.8},name:"Sue"}
	// 					];
	// render_map();
}




// var BG;
// var FG;
// var PIPES;
// var DUCT;


// var update_background;
// var update_border;
// var update_foreground;
// var update_pipes;
// var update_vegetation;
// var update_underpipes;

// var ctx_screen;
// var ctx_background;
// var ctx_vegetation;
// var ctx_herbivores;
// var ctx_predators;
// var ctx_underpipes;
// var ctx_pipes;
// var ctx_overpipes;
// var ctx_border;

// function random_border_location () { 
// 	var x = Math.random();
// 	var y = Math.random();
// 	switch (Math.floor(Math.random() * 4)) {
// 		case 0: x = Math.random() * BORDER_WIDTH/2; break;
// 		case 1: x = 1 - (Math.random() * BORDER_WIDTH/2); break;
// 		case 2: y = Math.random() * BORDER_WIDTH/2; break;
// 		case 3: y = 1 - (Math.random() * BORDER_WIDTH/2); break;
// 	}
// 	return ({x:x,y:y});
// }


// function initialize_render() {

// 	ctx_map = build_context('map');
// 	$('#background_image').src = BACKGROUND.src;
// }

// var BACKGROUND;

// function preloadImages(callback) { 

// 	var images = ['background'];
//     var img;
//     var remaining = images.length;
//     for (var i = 0; i < images.length; i++) {
//         img = new Image();
//         img.onload = function() {
//             --remaining;
//             if (remaining <= 0) {
//                 callback();
//             }
//         };
//         img.src = images[i]+ '.png';
//         switch (images[i]) {
//         	case 'background': BACKGROUND = img;
//         }
//     }
// }


// function toScreen (unitloc) {
// 	return {'x':unitloc.x * CANVAS_WIDTH, 'y': unitloc.y * CANVAS_HEIGHT};
// }

// function toUnit (screenloc) {
// 	return {'x':screenloc.x / CANVAS_WIDTH, 'y': screenloc.y / CANVAS_HEIGHT};
// }



// function build_context (id) {
// 	var canvas = document.getElementById(id);
// 	canvas.width = CANVAS_WIDTH; //currently broken, JS can't find global CANVAS_WIDTH
// 	canvas.height = CANVAS_HEIGHT; 
// 	var ctx = canvas.getContext("2d");
// 	return (ctx);
// };



// function draw_screen() {
// 	ctx_screen.fillStyle = "white";
// 	ctx_screen.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
// }


// function draw_background (alpha) {
// 	if (!update_background) return;
// 	ctx_background.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 	ctx_background.globalAlpha = alpha;
// 	ctx_background.drawImage(BG,0,0,BG.naturalWidth,BG.naturalHeight,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 	ctx_background.globalAlpha = 1;
// 	// update_background = false;
// }

// function fudge (value,percentage) { return value;
// 	return (value * (1 + percentage * 2 * (Math.random()-0.5)));
// }



// function draw_vegetation () { 
// 	ctx_vegetation.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 	for (var i=0; i<GRID_RESOLUTION; i++){
// 		for (var j=0; j<GRID_RESOLUTION; j++){
// 			var cell = VGRID[i][j];
// 			if (!cell.occupied) continue; 
// 			// HACK //
// 			var image = flora[cell.species].image; // flora[cell.species].images[cell.blob];
// 			// HACK. the factor below should be checked
// 			ctx_vegetation.globalAlpha = (.1 + .9 * flora[cell.species].current_level/7) * cell.alpha * 1.5;			
// 			if(flora[cell.species].current_level == 0) ctx_vegetation.globalAlpha = 0;			
// 			ctx_vegetation.translate(cell.location.x + cell.size/2, cell.location.y + cell.size/2);
// 			ctx_vegetation.rotate(cell.rotation); 
// 			ctx_vegetation.drawImage(image,0,0,image.naturalWidth,image.naturalHeight,
// 				-cell.size/2,-cell.size/2,cell.size,cell.size);
// 			ctx_vegetation.rotate(-cell.rotation);
// 			ctx_vegetation.translate(-cell.location.x - cell.size/2, -cell.location.y - cell.size/2);
// 			ctx_vegetation.globalAlpha = 1; 			
// 		}
// 	}
// }








// function draw_herbivores () {
// 	ctx_herbivores.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 	for (var i=0; i<fauna.herbivores.length; i++)
// 		for (var j=0; j<fauna.herbivores[i].bugs.length; j++) {
// 			draw_bug (fauna.herbivores[i].bugs[j], ctx_herbivores);
// 		}
// }

// function draw_bug (bug, ctx) { 
// 	// var bug = species.bugs[index];
// 	var species = fauna[bug.troph][bug.species];
// 	var image = species.image; 
// 	var bug_size_pct = UNIT_BUG_SIZE_PCT * species.scale; // pixels
// 	var bug_size_pixels = bug_size_pct * min_dim();
// 	var frame_size = image.naturalWidth/species.frames; 
// 	var loc = toScreen({x: bug.location.x + bug_size_pct/2, y: bug.location.y + bug_size_pct/2}); 
// 	ctx.translate(loc.x, loc.y);
// 	ctx.rotate(bug.heading + Math.PI/2 + species.rotation);
// 	if(bug.troph == "herbivores" && bug.state == "being eaten") ctx_herbivores.globalAlpha = bug.countdown/(DYING_DURATION * FRAME_RATE); 

// 	ctx.drawImage(image,bug.curFrame*frame_size,0,frame_size,frame_size,
// 		-bug_size_pixels/2,-bug_size_pixels/2,bug_size_pixels,bug_size_pixels);
// 	if(bug.troph == "herbivores" && bug.state == "being eaten") ctx_herbivores.globalAlpha = 1; 
// 	ctx.rotate(-bug.heading - Math.PI/2 - species.rotation);
// 	ctx.translate(-loc.x, -loc.y);
// 	bug.curFrame = (bug.curFrame + 1) % species.frames;
// }

// function draw_predators () {
// 	ctx_predators.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 	for (var i=0; i<fauna.predators.length; i++)
// 		for (var j=0; j<fauna.predators[i].bugs.length; j++)
// 			draw_bug (fauna.predators[i].bugs[j], ctx_predators);
// }

// function draw_pipes () {
// 	if (!update_pipes) return;
// 	ctx_pipes.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 	var wd = CANVAS_WIDTH/3;
// 	var ht = wd/3;
// 	ctx_pipes.drawImage(PIPES,0,0,PIPES.naturalWidth,PIPES.naturalHeight,0,CANVAS_HEIGHT-ht,wd,ht);
// 	ctx_pipes.drawImage(DUCT,0,0,DUCT.naturalWidth,DUCT.naturalHeight,0,CANVAS_HEIGHT/2,CANVAS_WIDTH,CANVAS_HEIGHT/50);
// 	ctx_pipes.drawImage(DUCT,0,0,DUCT.naturalWidth,DUCT.naturalHeight,0,CANVAS_HEIGHT/2 + CANVAS_HEIGHT/50,CANVAS_WIDTH,CANVAS_HEIGHT/50);
// 	update_pipes = false;
// }

// function draw_border () {
// 	var border = BORDER_WIDTH * min_dim();
// 	ctx_border.fillRect(0, 0, CANVAS_WIDTH, border);
// 	ctx_border.fillRect(0, 0, border, CANVAS_HEIGHT);
// 	ctx_border.fillRect(0, CANVAS_HEIGHT - border, CANVAS_WIDTH,CANVAS_HEIGHT);
// 	ctx_border.fillRect(CANVAS_WIDTH-border, 0, border, CANVAS_HEIGHT);
// }

// // type = {colonize, trap, none}
// var UNDERPIPE_DURATION = 60; // seconds
// var UNDERPIPE_STEPS = UNDERPIPE_DURATION * FRAME_RATE;
// var UNDERPIPE = {type: 'none', curStep: 0, location: {x:0,y:0}, trigger: false }
// var COLONIZER_SIZE = 200;

// // function initialize_underpipe (type,species) {
// // 	UNDERPIPE.type = type;
// // 	UNDERPIPE.curStep = UNDERPIPE_STEPS;
// // 	UNDERPIPE.location = {x: BORDER_WIDTH + Math.random() * (1 - 2 * BORDER_WIDTH), y: BORDER_WIDTH + Math.random() * (1 - 4 * BORDER_WIDTH)};
// // 	UNDERPIPE.species = species;
// // 	UNCERPIPE.trigger = true;
// // }

// function spew_bugs(troph, species, location) { 
// 	// alert(troph + '  ' + species + ' ' + location.x + ' ' +location.y); 
// 	var x = location.x * CANVAS_WIDTH  + COLONIZER_SIZE/2;
// 	var y = location.y * CANVAS_HEIGHT + COLONIZER_SIZE/2;


// 	for (var i=0; i<100; i++) {
// 		var b = new_bug(troph, species, {x: x/CANVAS_WIDTH,y: y/CANVAS_HEIGHT});
// 		fauna[troph][species].bugs.push(b); 
// 	};
// }


// function draw_underpipes() {  // colonizers and traps
// 	if (UNDERPIPE.type == 'none') return; 
// 	var x = UNDERPIPE.location.x * CANVAS_WIDTH;
// 	var y;
// 	var image = UNDERPIPE.type == 'colonize' ? COLONIZER : TRAP;

// 	if (UNDERPIPE.curStep-- == 0) {
// 		ctx_underpipes.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 		UNDERPIPE.type = 'none';
// 		return;
// 	}

// 	// descending


// 	// if (UNDERPIPE.curStep/UNDERPIPE_STEPS >= .75) {
// 	// 	var y_inc, y_orig;
// 	// 	y_orig = -COLONIZER_SIZE; 
// 	// 	y_inc = (UNDERPIPE.location.y*CANVAS_HEIGHT - y_orig)/(UNDERPIPE_STEPS/4);
// 	// 	y = y_orig + (UNDERPIPE_STEPS-UNDERPIPE.curStep) * y_inc;
// 	// } else if (UNDERPIPE.curStep/UNDERPIPE_STEPS >= .25) { 
// 	// 	if (UNDERPIPE.trigger) { 
// 	// 		if (UNDERPIPE.type == 'colonize') spew_bugs (UNDERPIPE.troph, UNDERPIPE.species, UNDERPIPE.location);
// 	// 		UNDERPIPE.trigger = false;
// 	// 	}
// 	// } else {
// 	// 	var y_inc, y_orig;
// 	// 	y_orig = -COLONIZER_SIZE; 
// 	// 	y_inc = (UNDERPIPE.location.y*CANVAS_HEIGHT - y_orig)/(UNDERPIPE_STEPS/4);
// 	// 	y = y_orig + (UNDERPIPE.curStep) * y_inc;		
// 	// } 


// 	if (UNDERPIPE.curStep/UNDERPIPE_STEPS >= .75 || UNDERPIPE.curStep/UNDERPIPE_STEPS < .25) {
// 		CULLING = false;
// 		ctx_underpipes.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 		var y_inc, y_orig;
// 		y_orig = -COLONIZER_SIZE; 
// 		y_inc = (UNDERPIPE.location.y*CANVAS_HEIGHT - y_orig)/(UNDERPIPE_STEPS/4);
// 		if (UNDERPIPE.curStep/UNDERPIPE_STEPS >= .75) y = y_orig + (UNDERPIPE_STEPS-UNDERPIPE.curStep) * y_inc;
// 		if (UNDERPIPE.curStep/UNDERPIPE_STEPS < .25) y = y_orig + (UNDERPIPE.curStep) * y_inc;
// 		ctx_underpipes.beginPath();
// 		ctx_underpipes.lineWidth = 2;
// 		ctx_underpipes.moveTo(x+COLONIZER_SIZE/2,0);
// 		ctx_underpipes.lineTo(x+COLONIZER_SIZE/2, y+20);
// 		ctx_underpipes.stroke();
// 		ctx_underpipes.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 
// 			x, y, COLONIZER_SIZE, COLONIZER_SIZE);
// 		ctx_underpipes.drawImage(fauna[UNDERPIPE.troph][UNDERPIPE.species].image, 0, 0, fauna[UNDERPIPE.troph][UNDERPIPE.species].image.naturalWidth/4, fauna[UNDERPIPE.troph][UNDERPIPE.species].image.naturalWidth/4, 
// 			x+COLONIZER_SIZE/2-64/2, y + COLONIZER_SIZE/2 - 64/2, 64, 64); // this line needs to be un-hardwired
// 		return;
// 	}
// 	// ctx_underpipes.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
// 	if (UNDERPIPE.trigger) { 
// 		if (UNDERPIPE.type == 'colonize') spew_bugs (UNDERPIPE.troph, UNDERPIPE.species, UNDERPIPE.location);
// 		else CULLING=true;
// 		UNDERPIPE.trigger = false;
// 	}


// 	// alert(x + ' ' + y);
// 	// $('#underpipes').show();
// }

// var CULLING = false;















