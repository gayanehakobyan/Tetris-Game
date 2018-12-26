//Rotate each piece of tetromino 
function rotatePieces(piece){ 
	let tempArray = JSON.parse(JSON.stringify(piece));
	tempArray = tempArray.reverse();
	 for (let i = 0; i < tempArray.length; i++) {
    	for (let j = 0; j < i; j++) {
      		let temp = tempArray[i][j];
     		 tempArray[i][j] = tempArray[j][i];
    		 tempArray[j][i] = temp;
    	}
  	}
	return tempArray;
}


let I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]
];
 
I[1] = rotatePieces(I[0]);
I[2] = rotatePieces(I[1]);
I[3] = rotatePieces(I[2]);

let L = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	]	
];

L[1] = rotatePieces(L[0]);
L[2] = rotatePieces(L[1]);
L[3] = rotatePieces(L[2]);

let J = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	]
];

J[1] = rotatePieces(J[0]);
J[2] = rotatePieces(J[1]);
J[3] = rotatePieces(J[2]);



let O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

O[1] = rotatePieces(O[0]);
O[2] = rotatePieces(O[1]);
O[3] = rotatePieces(O[2]);


let S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	]
];

S[1] = rotatePieces(S[0]);
S[2] = rotatePieces(S[1]);
S[3] = rotatePieces(S[2]);



let T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	]
];

T[1] = rotatePieces(T[0]);
T[2] = rotatePieces(T[1]);
T[3] = rotatePieces(T[2]);


let Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	]
];


Z[1] = rotatePieces(Z[0]);
Z[2] = rotatePieces(Z[1]);
Z[3] = rotatePieces(Z[2]);

