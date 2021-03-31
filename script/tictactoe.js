var ingame=false;
var playerX=true;
var moves=0;

function clickSquare(n){
    var square = document.getElementById(n);
    if(ingame & square.innerHTML == ""){
        square.innerHTML = (playerX ? "X" : "O");
        moves++;
        document.getElementById("status").innerHTML="Player "+(playerX?"O":"X")+"'s turn.";
        checkWin();
        playerX=!playerX;
    }
}

function startGame(){
    //clear squares
    var squares = document.getElementById("gameboard").children;
    for (let i=0; i<squares.length; i++){
        squares[i].innerHTML="";
    }
    ingame=true;
    playerX=true;
    moves=0;
    document.getElementById("status").innerHTML="Game Started, Player X turn.";
    document.getElementById("startbutton").style.visibility = "hidden"; 
    document.getElementById("startbutton").innerHTML="Replay"
}

function checkWin(){
    var squares = document.getElementById("gameboard").children;
    if(squares[0].innerHTML!="" && squares[0].innerHTML==squares[1].innerHTML&&squares[0].innerHTML==squares[2].innerHTML){
        gameWon("top");
    }
    else if(squares[3].innerHTML!="" && squares[3].innerHTML==squares[4].innerHTML&&squares[3].innerHTML==squares[5].innerHTML){
        gameWon("middle");
    }
    else if(squares[6].innerHTML!="" && squares[6].innerHTML==squares[7].innerHTML&&squares[6].innerHTML==squares[8].innerHTML){
        gameWon("bottom");
    }
    else if(squares[0].innerHTML!="" && squares[0].innerHTML==squares[3].innerHTML&&squares[0].innerHTML==squares[6].innerHTML){
        gameWon("left");
    }
    else if(squares[1].innerHTML!="" && squares[1].innerHTML==squares[4].innerHTML&&squares[1].innerHTML==squares[7].innerHTML){
        gameWon("center");
    }
    else if(squares[2].innerHTML!="" && squares[2].innerHTML==squares[5].innerHTML&&squares[2].innerHTML==squares[8].innerHTML){
        gameWon("right");
    }
    else if(squares[0].innerHTML!="" && squares[0].innerHTML==squares[4].innerHTML&&squares[0].innerHTML==squares[8].innerHTML){
        gameWon("down");
    }
    else if(squares[6].innerHTML!="" && squares[6].innerHTML==squares[4].innerHTML&&squares[6].innerHTML==squares[2].innerHTML){
        gameWon("up");
    }
    else if(moves==9){
        document.getElementById("status").innerHTML="It's a tie";
        ingame=false;
        document.getElementById("startbutton").style.visibility = "visible"; 
    }

}

function gameWon(c){
    document.getElementById("status").innerHTML="Player "+(playerX?"X":"O")+" has won. Start a new game.";
    ingame=false;
    document.getElementById("startbutton").style.visibility = "visible"; 
}