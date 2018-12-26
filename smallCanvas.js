let nextPatern = document.getElementById("nextPatern");
let nextCtx = nextPatern.getContext('2d');
let smollBoard = []; 



for(let r = 0; r < 4; r++){
	smollBoard[r] = [];
	for(let c = 0; c < 4; c++){

		smollBoard[r][c] = empty;
	};
};


function drawSmallSquare(x, y, color){
	nextCtx.fillStyle = color;
	nextCtx.fillRect(x* SQ, y*SQ, SQ, SQ);
	nextCtx.strokeStyle = "black";
	nextCtx.strokeRect(x* SQ, y*SQ, SQ, SQ);
}

function drawSmallBoard(){
	for(let r = 0; r < smollBoard.length; r++){
		for(let c = 0; c <  smollBoard.length; c++){
			drawSmallSquare(c, r, smollBoard[r][c]);
		};
	};
};

function drawSmallCanvas(table,color){

	for(let r = 0; r < table.length; r++){
		for(let c = 0; c < table.length; c++){
			if(table[r][c] === 1){
				drawSmallSquare(c, r, color);				
			};
		};
	};
};

drawSmallBoard()