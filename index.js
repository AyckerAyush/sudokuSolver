var numselected=null;
var tileselected=null;


window.onload=function(){
    setGame();
}
function setGame(){
    for(let i=1;i<=9;i++){
        let number=document.createElement('div');
            number.id= i;
            number.innerText=i;
            number.addEventListener("click",selectNumber);
            number.classList.add("tile");
            document.getElementById("number").append(number);
    }
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
           
            let tile=document.createElement('div');
            tile.id= i.toString()+'-'+j.toString();
            tile.innerText=0;
            if(i==2 || i==5){
                tile.classList.add("horizontal-line");
            }
            if(j==2 || j== 5){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click",selectTile)
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}


function selectNumber(){
    if(numselected != null){
        numselected.classList.remove("number-selected");
    }
    numselected=this;
    numselected.classList.add("number-selected");
}
let sudoku=[];
for(let l=0;l<9;l++){
    sudoku[l]=[];
    for(let m=0;m<9;m++){
        sudoku[l][m]=0;
    }
}
function selectTile(){
    if(numselected){
        this.classList.add("tile-start");
    }
    this.innerText=numselected.id;
    let pos=this.id.split("-");
    let r=parseInt(pos[0]);
    let c=parseInt(pos[1]);
    sudoku[r][c]=parseInt(numselected.id);

}
// let p=document.getElementById("solution");
// p.addEventListener("click",solver(sudoku));
// console.log(p);
function check(sudoku,row,col,key){
    for(let i=0;i<9;i++){
        if(sudoku[row][i] == key || sudoku[i][col]== key){
            return null;
        }
        if(sudoku[3*parseInt(row/3)+i%3][3*parseInt(col/3)+i/3] == key){
            return null;
        }
    }
    return 1;
}
function solve(sudoku){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(sudoku[i][j] == 0){
                for(let k=1;k<=9;k++){
                    if(check(sudoku,i,j,k) != null){
                        sudoku[i][j]=k;
                        if(solve(sudoku) != null){
                            return 1;
                        }
                        else{
                            sudoku[i][j]=0;
                        }
                    }
                }
                return null;
            }
        }
    }
    return 1;
}
function solver(sudoku){
    if(solve(sudoku)!= null){
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let tile_id= i.toString()+'-'+j.toString();
                document.getElementById(tile_id).innerText=sudoku[i][j];
            }
        }
    }
    else{
        console.log("can not be solved");
    }
}
