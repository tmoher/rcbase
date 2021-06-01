
// bugs.js
//

function new_bug (troph, species, location) {
	return ({location:location,species:species,countdown:0,troph:troph,curFrame:0,state:'moving',
		heading: Math.PI * 2 * Math.random() - Math.PI, attention: Math.floor(10 + .9 * Math.random() * MAX_ATTENTION)})
}

function insert_bug (bug) {
	fauna[bug.troph][bug.species].bugs.push(bug);
}

function remove_bug (bug, index) { if (fauna[bug.troph][bug.species].bugs.length-1 < index) alert('gotcha in remove bug');
	fauna[bug.troph][bug.species].bugs.splice(index,1);
}

