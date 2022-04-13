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
  alert(name);
  
}
function gridcolumns(name) {
    var colattribute = document.createElement("td");
    colattribute.setAttribute("onclick",`select(${name})`);
    colattribute.setAttribute("id", name);
    colattribute.style.height = (500 / size) + "px";
    colattribute.style.width = (500 / size) + "px";
    return colattribute;
}

