var lastOp = true; //true if last character was an operator, or screen is empty, false otherwise. Prevents multiple operators being entered.
var lastCalc=false; //true if last operation was the solve, indicates that next numerical input should reset the screen first.
function updateDisplay(c){
    if((isNaN(c))){
       switch(c){
           case 'c':
               clearDisplay();
               break;
           case '=':
                solveDisplay();
                break;
           default:
               if(!lastOp)
                document.getElementById("display").innerHTML += c; 
                lastOp=true;
                lastCalc=false;
                break;
       }
    }
    else{ //button clicked is a number.
        if(lastCalc)
            clearDisplay();
        document.getElementById("display").innerHTML += c;
        lastOp=false;
    }
}

function solveDisplay(){
    if(document.getElementById("display").innerHTML=="")
        return;
    else if(lastOp)
        document.getElementById("display").innerHTML = "Err";
    else{
    document.getElementById("display").innerHTML = eval(document.getElementById("display").innerHTML);
    }
    lastCalc=true;
}

function clearDisplay(){
    document.getElementById("display").innerHTML = "";
    lastCalc=false;
    lastOp=true;
}
