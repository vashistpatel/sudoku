var number;
var cell_tile;
var disableSelect;
var tracker;
window.onload = function(){

    let fillBoard = [[-1,1,-1,-1,-1,-1,-1,9,-1],
                     [-1,-1,4,-1,-1,-1,2,-1,-1],
                     [-1,-1,8,-1,-1,5,-1,-1,-1],
                     [-1,-1,-1,-1,-1,-1,-1,3,-1],
                     [2,-1,-1,-1,4,-1,1,-1,-1],
                     [-1,-1,-1,-1,-1,-1,-1,-1,-1],
                     [-1,-1,1,8,-1,-1,6,-1,-1],
                     [-1,3,-1,-1,-1,-1,-1,8,-1],
                     [-1,-1,6,-1,-1,-1,-1,-1,-1]];

    var table = document.getElementById("board");
    generateTable(table,fillBoard);

    // creating the pallete
    var pallette = document.getElementById('pallette'),rIndex,cIndex;
    for(let i=0; i<9; i++){
        pallette.rows[0].cells[i].onclick = function(){
            
            if(this.classList.contains("selected")){ //if already selected
                this.classList.remove("selected");
                number = null;
            } else{ //is not already selected
                //deselect all other numbers
                for(let i=0;i<9;i++){                        
                    pallette.rows[0].cells[i].classList.remove("selected")
                    number = null;
                }
                //select the num and update
                this.classList.add("selected");
                number = this;
                // number.classList.add("selected");
                update();
                
            }                            
        };
    }
    // creating the undo button
    pallette.rows[0].cells[9].onclick = function(){
        // if(cell_tile.textContent){
        //     console.log(cell_tile.textContent)
        //     // cell_tile.textContent = -1;
        // }
        if(cell_tile){
            // emptyError()
            cell_tile.textContent = null;
            cell_tile.classList.remove("user-input");
            cell_tile.classList.remove("selected");
            
            number = null;
            cell_tile = null;
        //     // checkCorrect(cell_tile)
        }
    }
};

// creates each cell of the board
function generateTable(table, data){
    let idCount = 0;
    for(let i=0; i<9; i++){
        let tr = table.insertRow(); //<tr>
        for(let j=0; j<9; j++){
            var td = tr.insertCell(); //<td>
            let text = document.createTextNode(data[i][j]);

            td.id = (""+i+j); // sets cell id
            td.classList.add("cell"); //add each td/cell to cell class
            if(data[i][j]!=-1){
                td.appendChild(text);
            }else{
                td.addEventListener('click',function(){
                    if(!disableSelect){
                        if(td.classList.contains("selected")){ //if already selected
                            td.classList.remove("selected");
                            // td.classList.remove("userinput");
                            cell_tile = null;
                        } else{ //is not already selected                                           
                            //select the num and update
                            // this.classList.add('tracker');
                            this.classList.add("selected");
                            this.classList.add('user-input');
                            
                            cell_tile = this;
                            update();                            
                        }
                    }
                    console.log("clicked")
                });
            }

        }
    }
    
};

function update(){
    // Check if the user input and a cell form the baord is selected or not
    if(cell_tile && number){
        // place the number in the cell
        cell_tile.textContent = number.textContent;
        
        // unselect everything if the selection is correct
        if(checkCorrect(cell_tile)){
            cell_tile.classList.remove('selected');
            number.classList.remove('selected');
            cell_tile = null;
            number = null;
        }
        // else{
            //unselects everyting regardless of correct or incorrecting selection
            // cell_tile.classList.remove('selected');
            // number.classList.remove('selected');
            // cell_tile = null;
            // number = null;
        // }
        // cell_tile = null;
        // number = null;
    }
    // if(temp == 1){
    //     cell_tile.textContent = null;
    //     cell_tile.classList.remove("user-input");
    //     //     cell_tile.classList.remove("selected");
            
    //     //     number = null;
    //     //     cell_tile = null;

    //     cell_tile.classList.remove('selected');
    //     // number.classList.remove('selected');
    //     cell_tile = null;
    //     number = null;
    // }
}

function checkCorrect(cell_tile){
    // Stores the id in x1 and y1
    var arr;
    var x1;
    var y1;
    arr = splitToDigit(cell_tile.id)
    x1 = arr[0];
    y1 = arr[1];
    
    // Calls the three different types of check 
    var block = sameBlock(x1,y1,cell_tile)
    var row = sameRow(x1,y1,cell_tile)
    var col = sameColumn(x1,y1,cell_tile)

    // Returns true if all three checks are true,
    // else returns false.
    if((block == true) && (row == true) && (col == true)){
        return true;
    }else{
        return false;
    }
};

function sameBlock(x1, y1, cell_tile) {
    startrow = x1 - x1%3;
    startcol = y1 - y1%3;
    let temp;

    // Loops through every cell in the 3x3 box which contians the user input
    for(var i=startrow;i<startrow+3;i++){
        for(var j=startcol;j<startcol+3;j++){
            // Avoid checking the same cell to iteself
            if((x1==i)&&(y1==j)){
                console.log("not checking")
            }else{
                // If cell is not empty, then check
                if (document.getElementById(""+i+j).textContent){ 
                    // If selected cell matched the cell with id, 
                    // add to 'error' class list
                    if(cell_tile.textContent == document.getElementById(""+i+j).textContent){
                        temp = false;
                        document.getElementById(""+i+j).classList.add('error');
                    }
                }
            }
        }
    }
    // Returns false if 3x3 box has same number as user input (cell_tile)
    if(temp==false){
        return false;
    }else{
        return true;
    }
}

function sameRow(x1, y1, cell_tile) {
    let temp;
    row = x1;

    // Loops through every cell in the row
    for (let i=0;i<9;i++){
        if(y1==i){ // Avoid checking the same cell to iteself
            console.log("not checking")
        } else{
            // If cell is not empty, then check
            if(document.getElementById(""+row+i).textContent){
                // If selected cell matched the cell with id, 
                // add to 'error' class list
                if(cell_tile.textContent == document.getElementById(""+row+i).textContent){
                    temp = false;
                    document.getElementById(""+row+i).classList.add('error');
                }
            }
        }
    }

    // Returns false if 3x3 box has same number as user input (cell_tile)
    if(temp==false){
        return false;
    }else{
        return true;
    }
}

function sameColumn(x1, y1, cell_tile) {
    col = y1;
    let temp;
    // Loops through every cell in the col
    for (let i=0;i<9;i++){
        if(x1==i){
            console.log("not checking")
        } else{
            // If cell is not empty, then check
            if(document.getElementById(""+i+col).textContent){
                // If selected cell matched the cell with id, 
                // add to 'error' class list
                if(cell_tile.textContent == document.getElementById(""+i+col).textContent){
                    temp = false;
                    document.getElementById(""+i+col).classList.add('error');
                }
            }
        }
    }

    // Returns false if 3x3 box has same number as user input (cell_tile)
    if(temp==false){
        return false;
    }else{
        return true;
    }
}
// Empties 'error' classlist
function emptyError(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            document.getElementById(""+i+j).classList.remove('error');
        }
    }
}

// Splits the id to individual numbers (e.g. '23' -> '2','3')
function splitToDigit(n){
    return (n + '').split('').map((i) => { return Number(i); })
}
  

