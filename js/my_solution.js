 // U3.W7: Design your own Code Combat Mission

// This is a solo challenge

// Your mission description:
// Overall mission: Talk to guardian to open cell door
// Goals: Avoid others prisoners, open the door
// Characters: Player, Prisoners, Guardian, Door
// Objects: Player(name,position,capture), Prisoner(name,position), Guardian(name,position), Door
// Functions: move,talk,open,escape,capture

// Pseudocode
// Create an object Prisoner with a name attribute equal to "Player"
// with a fix position at 0,0 (starting position)
// Create at least 2 objects Prisoner with a name attribute equal to "Prisoner 1" and "Prisoner 2"
// with random positions
// Create a Guardian object at a fix position
// Move the Prisoner (player = true) to get him to talk the guardian
// Move others prisoners randomly
// Open cell door

// Initial Code
var initial_x_pos = 0;
var initial_y_pos = 0;
var final_x_pos = 600;
var final_y_pos = 600;
var fixed_move_distance = 10;
var elements_width = 60;

var player_div;
var guardian_div;
var prisioner_one_div;
var prisioner_two_div;
var cell_door_div;

var guardian = {
	name : "Guardian",
	talked :false,
	position : {
		x : final_x_pos - elements_width,
		y : final_y_pos - elements_width
	},
	talk : function() {
		console.log("Guardian position " + this.position.x + "," + this.position.y);
		if(is_player_close_to(this)){
			this.talked = true;
			console.log("Press O to open cell");
			alert("Press O to open cell");
		} else {
			console.log("You need to be close to the guardian to talk to him");
			alert("You need to be close to the guardian to talk to him");
		}
	}
};

var cell_door = {
	name : "Cell door",
	position : {
		x : final_x_pos - 50,
		y : final_y_pos - (elements_width*3)
	},
	open : function(){
		if(is_player_close_to(this) && guardian.talked){
			console.log("You got out of cell!!")
			var replay = confirm("Congratulations you got out of cell!!. Do you want to play again");
			if(replay){
				location.reload();
			}
		} else {
			if(!guardian.talked){
				alert("You need to talk to the guardia first");
			} else {
				alert("You have to be on top of the door and far right as possible to open it");
			}
			
		}
	}
}

var player = {
	name : "Player",
	position : {
		x : 0,
		y : 0
	},
	capture : false,
	move : function(direction){
		if(!this.capture){
			//move left key A = 97
			if(direction == 97 ){
				if(this.position.x >= (initial_x_pos + fixed_move_distance)){
					this.position.x  -= fixed_move_distance;
				}				
			}
			//move down key S = 115
			if(direction == 115 ){
				if(this.position.y <= (final_y_pos - (fixed_move_distance + elements_width))){
					this.position.y  += fixed_move_distance;
				}				
			}
			//move right key D = 100
			if(direction == 100 ){
				if(this.position.x <= (final_x_pos - (fixed_move_distance + elements_width))){
					this.position.x  += fixed_move_distance;
				}				
			}
			//move up key W = 119
			if(direction == 119 ){
				if(this.position.y >= (initial_y_pos + fixed_move_distance)){
					this.position.y  -= fixed_move_distance;
				}				
			}
			if(is_player_close_to(guardian) && !guardian.talked){
				console.log("Press T to talk to the guardian");
				alert("Press T to talk to the guardian");
			}
		} else {
			console.log("press R to release yourself from prisoner")
			alert("press R to release yourself from prisoner");
		}
	//	console.log(direction);
	},
	talk : function() {
		guardian.talk();
	}
};

var prisoner_one = {
	name : "Prisoner One",
	position : {
		x : getRandomInt(initial_x_pos,final_x_pos - elements_width),
		y : getRandomInt(initial_y_pos,final_y_pos - elements_width)
	},
	capture : function() {
		if(is_player_close_to(this)){
			player.capture = true;
			console.log("You have been capture by " + this.name);
			alert("You have been capture by " + this.name );
		} 		
	},
	move :function(distance){
		if(((this.position.x + distance) >= initial_x_pos) && 
			((this.position.x + distance) <= final_x_pos)){
			this.position.x += distance;
		}
		if(((this.position.y + distance) > initial_y_pos) && 
			((this.position.y + distance) < final_y_pos)){
			this.position.y += distance;
		}
	}
};

var prisoner_two = {
	name : "Prisoner Two",
	position : {
		x : getRandomInt(initial_x_pos,final_x_pos - elements_width),
		y : getRandomInt(initial_y_pos,final_y_pos - elements_width)
	},
	capture : function() {
		if(is_player_close_to(this)){
			player.capture = true;
			console.log("You have been capture by " + this.name);
			alert("You have been capture by " + this.name );
		} 
	},
	move :function(distance){
		if(((this.position.x + distance) >= initial_x_pos) && 
			((this.position.x + distance) <= final_x_pos)){
			this.position.x += distance;
		}
		if(((this.position.y + distance) > initial_y_pos) && 
			((this.position.y + distance) < final_y_pos)){
			this.position.y += distance;
		}
	}
};

function move_prisoners(){
	var positions = [10,-10];
	prisoner_one.move(positions[getRandomInt(0,1)]);
	prisoner_two.move(positions[getRandomInt(0,1)]);
	prisoner_one.capture();
	prisoner_two.capture();
}

function is_player_close_to(other_player){
	console.log(other_player.name + " position " + other_player.position.x + "," + other_player.position.y);
	console.log("Player position " + player.position.x + "," + player.position.y);
	var x_distance = player.position.x - other_player.position.x;
	var y_distance = player.position.y - other_player.position.y;
	if(Math.abs(x_distance) <= fixed_move_distance && Math.abs(y_distance) <= (fixed_move_distance + elements_width)){
		return true;
	}
	return false;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function key_listener(event){
	var keyPress = event.keyCode;
	// key A = 97, S = 115 ,D= 100, W= 119
	if(keyPress == 97 || keyPress == 115 || keyPress == 100 || keyPress == 119){
		player.move(event.keyCode);
	} else if (keyPress == 116){
		// key T = 116 to talk to the guardian
		player.talk();
	} else if (keyPress == 114) {
		// key R = 114 for release
		player.capture = false;
	} else if (keyPress == 111) {
		// key O = 111 to open the door
		cell_door.open();
	}
	if(!player.capture){
		move_prisoners();
	}
	moveElements();
} 

function moveElements(){
	player_div.style.left = player.position.x + "px";
	player_div.style.top = player.position.y + "px";
	guardian_div.style.left = guardian.position.x + "px";
	guardian_div.style.top = guardian.position.y + "px";
	prisioner_one_div.style.left = prisoner_one.position.x + "px";
	prisioner_one_div.style.top = prisoner_one.position.y + "px";
	prisioner_two_div.style.left = prisoner_two.position.x + "px";
	prisioner_two_div.style.top = prisoner_two.position.y + "px";
	cell_door_div.style.top = cell_door.position.y + "px";
	cell_door_div.style.left = cell_door.position.x + "px";

}
function renderElements(){
	var div = document.getElementById("gameContainer");
	div.style.width = final_x_pos + "px";
	div.style.height = final_y_pos  + "px";
	div.style.left = initial_x_pos + "px";
	div.style.top = initial_y_pos + "px";
	div.style.margin = "auto";
	player_div = document.getElementById("player");
	guardian_div = document.getElementById("guardian");	
	prisioner_one_div = document.getElementById("prisoner_one");
	prisioner_two_div = document.getElementById("prisoner_two");
	cell_door_div = document.getElementById("door");	
	moveElements();
}

document.onkeypress = key_listener;

// Refactored Code






// Reflection
//
//
//
//
//
//
//
//