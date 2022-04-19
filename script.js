/* References: 
This was referenced for building the grid: https://javascript.plainenglish.io/the-game-of-life-using-javascript-fc1aaec8274f
*/

//user input grid size
var gameArray;
var inactive_array = [];
var gameClock;
var size;
var genNumber;

//function that loads the game
function startgame(){
  genNumber=0;
  promptSize();
  createArray();
    var display = document.getElementById("grid");
    var grid = creategrid();
    display.appendChild(grid);  
}
function promptSize(){
  size = window.prompt("Enter Number for Grid Size: (Minimum size is 5)");
  if(size<5){
     alert("You entered a size that was too small (Minimum size is 5)");
    promptSize();
  }
  showButtons();
}

//creating grid
function creategrid() {
    var grid = document.createElement("grid");
    grid.setAttribute("id", "game_grid");
    for (var i = 0; i < size; i++) {
        var tr = "tr_" + i;
        var row = gridrows(tr);
        for (var j = 0; j < size; j++) {
            var td = "td_" + i + "_" + j;
            var col = gridcolumns(td,i,j);
            row.appendChild(col);
        }
        grid.appendChild(row);
    }
    return grid;
}

function gridrows(name) {
    var rowattribute = document.createElement("tr");
    rowattribute.setAttribute("id", name);
    return rowattribute;
}

function gridcolumns(name,row,column) {
    var colattribute = document.createElement("td");
    colattribute.setAttribute("id", name);
    colattribute.setAttribute("onclick", "select(this)");
    colattribute.setAttribute("row", row);
    colattribute.setAttribute("col", column);
    return colattribute;
}

function select(td){
  let row=td.getAttribute('row');
  let col=td.getAttribute('col');
  if(gameArray[row][col]==0){
    gameArray[row][col]++;
  }else {
    gameArray[row][col]--;
  }
  //alert(`You clicked row ${row} and col ${col}`);
  displayArray();
}

//changing cells from alive to dead
function clickcells(td) {
    var cell = td.style.background;
    if (cell == "black") {
        td.style.background = "white";
    }
    else {
        td.style.background = "black";
    }
}

function createArray(){
  //I'm using the rows and columns variable to make it easier to understand the structure of my array
  let rows= size;
  let columns=size;
  gameArray=[];
  for(let i=0;i<rows; i++){
    //Initialize a new column
    gameArray[i]=[];
    inactive_array[i]=[];
    for(let j=0;j<columns;j++){
      gameArray[i][j]=0;
      inactive_array[i][j]=0;
    }
  }

}
function displayArray(){
  for(let i=0;i<size; i++){
    for(let j=0;j<size;j++){
      let id= "td_" + i + "_" + j;
      let curr=document.getElementById(id);
      if(gameArray[i][j]==0){
        curr.classList.add('dead');
        curr.classList.remove('alive');
      }
      if(gameArray[i][j]==1){
        curr.classList.add('alive');
        curr.classList.remove('dead');
      }
    }
  }
  showPopulation();
}

function startautogen(){
  //Start a timer to increment a generation every 5 sec
  gameClock=setInterval(gen1,5000);
  
}
function stopautogen(){
  //Use clearinterval to stop that timer
  clearInterval(gameClock);
}
function reset(){
  for(let i=0;i<size; i++){
    //Initialize a new column
    gameArray[i]=[];
    for(let j=0;j<size;j++){
      gameArray[i][j]=0;
    }
  }
  displayArray();
}
//Game of life functions
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
                  gameArray[i][j]= inactive_array[i][j];
                  
                }
   }
            gameArray = inactive_array;
            document.getElementById("generation").innerHTML = "Generation:"+genNumber;
}

function gen1(){
  console.log(gameArray.toString());
  updateLifeCycle();
  displayArray();
}
function gen23(){
  for(let i=0;i<23;i++){
    updateLifeCycle();
  }
  displayArray();
}

function updateCellValue(row, col){

            let total = countNeighbours(row, col);
            if(gameArray[row][col]== 1){
              //We are looking at a live cell
              if(total<2 || total>3){
                //If it's underpopulated or overcrowded
                return 0;
              }else return 1;//Else it lives
              
            }
            if(gameArray[row][col]==0){
              //We are looking at a dead cell
              if(total==3){
                //If it has 3 neighbors it becomes alive
                return 1;
              }else return 0;
              
            }
}

function countNeighbours(row, col){
            let total_neighbours = 0;
            total_neighbours += checkCellValueHelper(row - 1, col - 1);
            total_neighbours += checkCellValueHelper(row - 1, col);
            total_neighbours += checkCellValueHelper(row - 1, col + 1);
            total_neighbours += checkCellValueHelper(row, col - 1);
            total_neighbours += checkCellValueHelper(row, col + 1);
            total_neighbours += checkCellValueHelper(row + 1, col - 1);
            total_neighbours += checkCellValueHelper(row + 1, col);
            total_neighbours += checkCellValueHelper(row + 1, col + 1);
            console.log("Total Neighbors:"+total_neighbours);
            return total_neighbours;
}

function checkCellValueHelper(row, col){
  console.log(`trying [${row}][${col}]`);
  console.log(gameArray.toString());
            if(row<0||row>=size){
              console.log("Row exceeded size");
              return 0;              
            }else if(col<0||col>=size){
              console.log("Column exceeded size");
              return 0;            
            }else {
              console.log("Valid input:"+gameArray[row][col]);
              return gameArray[row][col];
            } 
}

function block(){
  reset();
  for(let i=0;i<2; i++){
    for(let j=0; j<2; j++){
      gameArray[i][j]=1;
      
    }
  }
  displayArray();
}
function blinker(){
  reset();
  let center = Math.floor(size/2);
  for (let i=center-1; i<center; i++){
    for(let j = i; j<i+3; j++)
    gameArray[i][j] = 1;
  }
  
  displayArray();
}
function beacon(){
  reset();
  for(let i=0;i<2; i++){
    for(let j=0; j<2; j++){
      gameArray[i][j]=1;     
    }
  }
  
  for(let i=2;i<4; i++){
    for(let j=2; j<4; j++){
      gameArray[i][j]=1;     
    }
  }
  displayArray();
}
function glider(){
  reset();
  gameArray[0][2]=1;
  gameArray[1][0]=1;
  gameArray[1][2]=1;
  gameArray[2][1]=1;
  gameArray[2][2]=1;
  displayArray();
}

function hide(ID){
  document.getElementById(ID).classList.add("hidden");
}
function show(ID){
  document.getElementById(ID).classList.remove("hidden");
}
function showButtons(){
  show("startautogen");
  show("stop");
  show("display");
  show("gen1");
  show("gen23");
  show("reset");
  show("block");
  show("blinker");
  show("beacon");
  show("glider");
  show("generation");
  show("population");
  hide("startgame");
}
function showPopulation(){
  let population=0;
  for(let i=0;i<size; i++){
    for(let j=0;j<size;j++){
      if(gameArray[i][j]==1)population++;
    }
  }
  document.getElementById("population").innerHTML = "Population:"+population;
}

