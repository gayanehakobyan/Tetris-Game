let table = document.getElementById("root")
let start = document.getElementById("start");
let restart = document.getElementById("restart");
let dropStart, example, randomColor, examoleN, activeExample, animation;
let board = [];	
let ROW = 18;
let COL = 10;
let empty="white"// color of empty square 
let X = 3;
let Y = 0;
let points=0;
let arrOfTetrominos = [];
let started = false;
let moveDown = false;
let firstDrop = false;



//drow a square
function drawSquare(id, color){
	document.getElementById(id).style.background = color;
}



for(let r = 0; r < ROW; r++){
	board[r] = [];
	for(let c = 0; c < COL; c++){
		board[r][c] = empty;
	};
};


for(var r = 0; r < ROW; r++) {
    for(var c = 0; c < COL; c++) {
     	let div = document.createElement("div");
     	div.className = "square"; 
 	 	table.appendChild(div);
 	 	div.id =  r + "." +c;
    };
};


// draw board with white color, and border
function drawBoard(){
	for(var r = 0; r < ROW; r++) {
	    for(var c = 0; c < COL; c++) {
	    	let id = r + "." + c
	    	drawSquare(id, board[r][c]);
	    };
	};
};


//draw board with black and white color.
drawBoard()
score();



// All pieses of tetromino
let picies = [
	[I, "red"],
	[J, "Tomato"],
	[L, "DodgerBlue"],
	[O, "orange"],
	[S, "MediumSeaGreen"],
	[T, "SlateBlue"],
	[Z, "Violet"]
]; 


// draw square, but it doesnt change squares color in board
function fill(color){
	for(let r = 0; r < activeExample.length; r++) {
	    for(let c=0; c<activeExample.length; c++) {
	    	if(activeExample[r][c] === 1){
    			let posY = r+Y;
    			let posX = c+X	;
	    		let id=posY + "." + posX;
		    	drawSquare(id, color);
	    	};

	    };
	};
};


function unDraw(){
	fill(empty);  
};

function draw(){
	fill(randomColor);
};


//main function
function move(){
	if(moveDown){
		if(!collision(0, 1, activeExample)){
			if(!firstDrop){
				draw();
				firstDrop = true;
			} else {
				unDraw();
				Y++;
				draw();				
			}

		}else {
			firstDrop = false;
		 	block(activeExample);
		 	drawSmallBoard()// Its drow small canvas withwhite color and border with black
		 	generateRandomPiece();
			X = 3;
			Y = 0;
		};
	};
};

//move left during the game
function moveLeft(){
	if(!collision(-1, 0, activeExample)){
		unDraw();
		X--;
		draw();
	};
};


// move right during the game
function moveRight(){
	if(!collision(1, 0, activeExample)){
		unDraw();
		X++;
		draw();
	};
};

//rotate tetromino during the game
function rotateRight(){
	if(examoleN === 3){
		examoleN = 0;
	} else {
		examoleN = (examoleN + 1);			
	};
	let nextTetemino = example[examoleN];
	if(!collision(0, 0,nextTetemino)){
		unDraw();
		activeExample = nextTetemino;
		draw();	
	};
};

function rotateLeft(){
	if(examoleN === 0){
		examoleN = 3;
	} else {
		examoleN = (examoleN - 1);			
	};
	let nextTetemino = example[examoleN];
	if(!collision(0, 0,nextTetemino)){
		unDraw();
		activeExample = nextTetemino;
		draw();	
	};
};
// It ckecks, if there is a collision or not. 
function collision(x, y, piece){
	for(let r = 0; r < piece.length; r++){
		for(let c = 0; c < piece.length; c++){
			if(piece[r][c] === 0){	
				continue;
			}
			let newX = X + c + x;
			let newY = Y +r + y;
			if(newX < 0 || newX >= COL || newY >= ROW){
				return true;
			}
			if(newY > -1){
				if(board[newY][newX] != empty){
					return true;
				};			
			};
		};
	};
	return false;		
};


// if 10 colums are not white delete that rows and add points +10
function clear(){
	for(let r = 0; r < ROW; r++){
        let count = 0;
        for(let c = 0; c < COL; c++){
            if(board[r][c]!==empty){
            	count++;
            };
        };
        if(count === 10){
            for( let i = r; i>0; i--){
                for(let  c = 0; c < COL; c++){
                    board[i][c] = board[i-1][c];
                };
            };
            points+=10;
            score();
        };
        count = 0;
	};
};


// block tetromino in place
function block(){                            
	for(let r = 0; r < activeExample.length; r++){
		for(let c = 0; c < activeExample.length; c++){
			if(Y+r <= 0){// in this case "Game over"
				cancelAnimationFrame(animation);                                               
				points = 0;               
				document.getElementById('container').style.display = "none";
				document.getElementById('gameOver').style.visibility = "visible";
			};  
			if(activeExample[r][c] === 1){  
				board[Y+r][X+c] = randomColor;				
			}  
		};  
	};
	clear();
	drawBoard();
};

// add points in score
function score(){
	document.getElementById("score").innerHTML = "Score: " + points;
};



// keyboard events left, right, down, rotate
document.addEventListener("keydown", control) ;


function control(event){
	if(moveDown){
		if(event.keyCode === 37){
			moveLeft();
			dropStart = Date.now();	
		} else if(event.keyCode === 38){
			rotateRight();
			dropStart = Date.now();			
		}else if (event.keyCode === 39){
			moveRight()
			dropStart = Date.now();			
		}else if(event.keyCode === 40){
			rotateLeft();
			dropStart = Date.now();			
		} else if(event.keyCode === 32){
			move()
			dropStart = Date.now();			
		} 
	}
	
}


function randomPiece(){
	return Math.floor(Math.random()* picies.length);
}


function generateRandomPiece(){
	if(started){
		arrOfTetrominos.pop();
		arrOfTetrominos.pop();
		arrOfTetrominos.unshift(picies[randomPiece()][1]);
		arrOfTetrominos.unshift(picies[randomPiece()][0]);
	} else {
		arrOfTetrominos[0] = picies[randomPiece()][0];
		arrOfTetrominos[1] = picies[randomPiece()][1];
		arrOfTetrominos[2] = picies[randomPiece()][0];
		arrOfTetrominos[3] = picies[randomPiece()][1];
		started=true;	

	}
	example = arrOfTetrominos[2];
	randomColor = arrOfTetrominos[3];
	examoleN = 0
	activeExample=example[examoleN];
}

generateRandomPiece()// genarate new piece
dropStart=Date.now();// 


//drop tetromino from top
function drop(){
	let now = Date.now();
	let delta = now-dropStart;
	if(delta > 500) {
		move();
		dropStart=Date.now()
	}
	drawSmallCanvas(arrOfTetrominos[0][0], arrOfTetrominos[1]);
	animation = window.requestAnimationFrame(drop)
}




start.addEventListener("click", firstStep) ;
restart.addEventListener("click", reload) ;

function reload(){
	location.reload();
}

function firstStep(){
	moveDown =true;
	drop();
}
