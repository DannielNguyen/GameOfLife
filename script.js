/* References: 
https://javascript.plainenglish.io/the-game-of-life-using-javascript-fc1aaec8274f
*/

//user input grid size
var size = window.prompt("Enter Number for Grid Size: ");

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
            var col = gridcolumns(td);
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
function select(name){
  let myItem=document.getElementById(name);
  myItem.classList.add('marked');
  alert(":"+name);
  
}
function gridcolumns(name) {
    var colattribute = document.createElement("td");
    colattribute.setAttribute("id", name);
    colattribute.setAttribute("onclick", "clickcells(this)")
    return colattribute;
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

