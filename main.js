let canvas = document.getElementById("tetris");
let ctx = canvas.getContext('2d');
let start = document.getElementById("start");//ka
let restart = document.getElementById("restart");//ka
let dropStart, example, randomColor, examoleN, activeExample;//ka
let board = [];//ka	
let ROW = 20;//ka
let COL = 10;//ka
let SQ = 30;//petq chi
let empty="white"// color of empty square //ka 
let X=3;//ka
let Y=-2;//ka
let points=0;//ka
let arrOfTetrominos = [];//ka
let started = false;//false
let moveDown=false;//false



//drow a square
function drawSquare(x, y, color){
	ctx.fillStyle = color;
	ctx.fillRect(x* SQ, y*SQ, SQ, SQ);
	ctx.strokeStyle = "black";
	ctx.strokeRect(x* SQ, y*SQ, SQ, SQ);
}//ka



for(let r = 0; r < ROW; r++){
	board[r] = [];
	for(let c = 0; c < COL; c++){
		board[r][c] = empty;
	};
};//ka


// draw board with white color, and border
function drawBoard(table, R, C){
	for(let r = 0; r < ROW; r++){
		for(let c = 0; c < COL; c++){
			drawSquare(c, r, board[r][c]);
		};
	};
};


//draw board with black and white color.
drawBoard();//ka
score();//la



// All pieses of tetromino
let picies = [
	[I, "red"],
	[J, "Tomato"],
	[L, "DodgerBlue"],
	[O, "orange"],
	[S, "MediumSeaGreen"],
	[T, "SlateBlue"],
	[Z, "Violet"]
]; //ka

console.log(picies)
// draw square, but it doesnt change squares color in board
function fill(color){
	for(let r = 0; r < activeExample.length; r ++){
		for(let c = 0; c < activeExample.length; c ++){
			if(activeExample[r][c] === 1){
				drawSquare(X + c, Y + r, color);			
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
	    	unDraw();
	   		Y++;
	    	draw();
		} else {
		 	block(activeExample);
		 	drawSmallBoard()// Its drow small canvas withwhite color and border with black
		 	generateRandomPiece();
			X=3;
			Y=-2;
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
		X++;;;
		draw();
	};
};

//rotate tetromino during the game
function rotate(){
	if(examoleN === 3){
		examoleN = 0;
	} else {
		examoleN = (examoleN + 1);			
	};
	let nextTetemino=example[examoleN];
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
			if(newY > 0){
				if(board[newY][newX] != empty){
					return true;
				};				
			}

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
	for(let r = 0; r <activeExample.length; r++){
		for(let c = 0; c < activeExample.length; c++){
			if(Y+r < 0){
				points = 0;
				document.getElementById('container').style.display = "none";
				document.getElementById('gameOver').style.visibility = "visible";
				break;
			};
			if(activeExample[r][c] === 1){
				board[Y+r][X+c] = randomColor;				
			}
		};
	};
	clear()
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
			rotate();
			dropStart = Date.now();			
		}else if (event.keyCode === 39){
			moveRight()
			dropStart = Date.now();			
		}else if(event.keyCode === 40){
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


generateRandomPiece();// genarate new piece
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
	window.requestAnimationFrame(drop)
}

start.addEventListener("click", firstStep) ;
restart.addEventListener("click", reload) ;

function reload(){
	location.reload();
	drop();// this function doesnt call 
}

function firstStep(){
	moveDown =true;
	drop()
}
