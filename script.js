/* References: 
This was referenced for building the grid: https://javascript.plainenglish.io/the-game-of-life-using-javascript-fc1aaec8274f

*/

//user input grid size
var gameArray;
var size = window.prompt("Enter Number for Grid Size: ");
createArray();
//function that loads the game
function startgame() {
    var display = document.getElementById("grid");
    var grid = creategrid();
    display.appendChild(grid);  
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
    for(let j=0;j<columns;j++){
      gameArray[i][j]=0;
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
}
