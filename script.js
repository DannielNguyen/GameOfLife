var gameArray;
var inactive_array = [];
var gameClock;
var size;
var genNumber;

function startgame() {
	genNumber = 0;
	size = 20;
	showButtons();
	createArray();
	var display = document.getElementById('grid');
	var grid = creategrid();
	display.appendChild(grid);
}

function creategrid() {
	var grid = document.createElement('grid');
	grid.setAttribute('id', 'game_grid');
	for (var i = 0; i < size; i++) {
		var tr = 'tr_' + i;
		var row = gridrows(tr);
		for (var j = 0; j < size; j++) {
			var td = 'td_' + i + '_' + j;
			var col = gridcolumns(td, i, j);
			row.appendChild(col);
		}
		grid.appendChild(row);
	}
	return grid;
}

function gridrows(name) {
	var rowattribute = document.createElement('tr');
	rowattribute.setAttribute('id', name);
	return rowattribute;
}

function gridcolumns(name, row, column) {
	var colattribute = document.createElement('td');
	colattribute.setAttribute('id', name);
	colattribute.setAttribute('onclick', 'select(this)');
	colattribute.setAttribute('row', row);
	colattribute.setAttribute('col', column);
	return colattribute;
}

function select(td) {
	let row = td.getAttribute('row');
	let col = td.getAttribute('col');
	if (gameArray[row][col] == 0) {
		gameArray[row][col]++;
	}
	else {
		gameArray[row][col]--;
	}
	displayArray();
}

function clickcells(td) {
	var cell = td.style.background;
	if (cell == 'black') {
		td.style.background = 'white';
	}
	else {
		td.style.background = 'black';
	}
}

function createArray() {
	let rows = size;
	let columns = size;
	gameArray = [];
	for (let i = 0; i < rows; i++) {
		gameArray[i] = [];
		inactive_array[i] = [];
		for (let j = 0; j < columns; j++) {
			gameArray[i][j] = 0;
			inactive_array[i][j] = 0;
		}
	}
}

function displayArray() {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let id = 'td_' + i + '_' + j;
			let curr = document.getElementById(id);
			if (gameArray[i][j] == 0) {
				curr.classList.add('dead');
				curr.classList.remove('alive');
			}
			if (gameArray[i][j] == 1) {
				curr.classList.add('alive');
				curr.classList.remove('dead');
			}
		}
	}
	showPopulation();
}

function startautogen() {
	gameClock = setInterval(gen1, 500);
}

function stopautogen() {
	clearInterval(gameClock);
}

function reset() {
	for (let i = 0; i < size; i++) {
		gameArray[i] = [];
		for (let j = 0; j < size; j++) {
			gameArray[i][j] = 0;
		}
	}
	genNumber = 0;
	document.getElementById('generation').innerHTML = 'Generation:' + genNumber;
	stopautogen();
	displayArray();
}

function updateLifeCycle() {
	genNumber++;
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			console.log(`Examining ${i} , ${j}`);
			console.log(gameArray.toString());
			let new_state = updateCellValue(i, j);
			inactive_array[i][j] = new_state;
		}
	}
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			gameArray[i][j] = inactive_array[i][j];
		}
	}

	document.getElementById('generation').innerHTML = 'Generation:' + genNumber;
}

function gen1() {
	updateLifeCycle();
	displayArray();
}

function updateCellValue(row, col) {
	let total = countNeighbours(row, col);
	if (gameArray[row][col] == 1) {
		if (total < 2 || total > 3) {
			return 0;
		}
		else return 1;
	}
	if (gameArray[row][col] == 0) {
		if (total == 3) {
			return 1;
		}
		else return 0;
	}
}

function countNeighbours(row, col) {
	let total_neighbours = 0;
	total_neighbours += checkCellValueHelper(row - 1, col - 1);
	total_neighbours += checkCellValueHelper(row - 1, col);
	total_neighbours += checkCellValueHelper(row - 1, col + 1);
	total_neighbours += checkCellValueHelper(row, col - 1);
	total_neighbours += checkCellValueHelper(row, col + 1);
	total_neighbours += checkCellValueHelper(row + 1, col - 1);
	total_neighbours += checkCellValueHelper(row + 1, col);
	total_neighbours += checkCellValueHelper(row + 1, col + 1);
	console.log('Total Neighbors:' + total_neighbours);
	return total_neighbours;
}

function checkCellValueHelper(row, col) {
	console.log(`trying [${row}][${col}]`);
	console.log(gameArray.toString());
	if (row < 0 || row >= size) {
		console.log('Row exceeded size');
		return 0;
	}
	else if (col < 0 || col >= size) {
		console.log('Column exceeded size');
		return 0;
	}
	else {
		console.log('Valid input:' + gameArray[row][col]);
		return gameArray[row][col];
	}
}

function block() {
	reset();
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 2; j++) {
			gameArray[i][j] = 1;
		}
	}
	displayArray();
}

function blinker() {
	reset();
	let center = Math.floor(size / 2);
	for (let i = center - 1; i < center; i++) {
		for (let j = i; j < i + 3; j++) gameArray[i][j] = 1;
	}

	displayArray();
}

function beacon() {
	reset();
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 2; j++) {
			gameArray[i][j] = 1;
		}
	}

	for (let i = 2; i < 4; i++) {
		for (let j = 2; j < 4; j++) {
			gameArray[i][j] = 1;
		}
	}
	displayArray();
}

function glider() {
	reset();
	gameArray[0][2] = 1;
	gameArray[1][0] = 1;
	gameArray[1][2] = 1;
	gameArray[2][1] = 1;
	gameArray[2][2] = 1;
	displayArray();
}

function hide(ID) {
	document.getElementById(ID).classList.add('hidden');
}

function show(ID) {
	document.getElementById(ID).classList.remove('hidden');
}

function showButtons() {
	show('startautogen');
	show('stop');
	//show("display");
	show('reset');
	show('block');
	show('blinker');
	show('beacon');
	show('glider');
	show('generation');
	show('population');
	hide('startgame');
}

function showPopulation() {
	let population = 0;
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (gameArray[i][j] == 1) population++;
		}
	}
	document.getElementById('population').innerHTML = 'Population:' + population;
}
