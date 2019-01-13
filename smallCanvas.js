let nextPatern = document.getElementById("nextPatern");
let smollBoard = []; 


for(let r = 0; r < 4; r++){
	smollBoard[r] = [];
	for(let c = 0; c < 4; c++){
		smollBoard[r][c] = empty;
	};
};


console.log(smollBoard)
for(var r=0; r<smollBoard.length; r++) {
    for(var c=0; c<smollBoard.length; c++) {
     let div= document.createElement("div");
		div.className="square"
 	 nextPatern.appendChild(div);
 	 div.id="s"+r+"."+c
    }
}


function drawSmallBoard(){
	for(let r = 0; r < smollBoard.length; r++){
		for(let c = 0; c <  smollBoard.length; c++){
			let id ="s"+r+"."+c
			drawSquare(id, smollBoard[r][c]);
		};
	};
};

function drawSmallCanvas(table,color){

	for(let r = 0; r < table.length; r++){
		for(let c = 0; c < table.length; c++){
			if(table[r][c] === 1){
				r +=1;
	    		let id = "s"+r +"." + c;
		    	drawSquare(id, color)
		    	r-=1;
	    	}
		};
	};
};

drawSmallBoard()