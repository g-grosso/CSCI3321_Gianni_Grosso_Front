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
    //todo: calculate
    document.getElementById("display").innerHTML = stringEval(document.getElementById("display").innerHTML);
    }
    lastCalc=true;
}

function clearDisplay(){
    document.getElementById("display").innerHTML = "";
    lastCalc=false;
    lastOp=true;
}

function stringEval(s){
    if(!isNaN(s)){
        return s;
    }   //This part appears to have backwards order of operations, but if you trace through it, the operations found last actually get calculated first.
    else if(s.includes("-")||s.includes("+")){
        var sb = s.lastIndexOf("-");
        var ad = s.lastIndexOf("+");
        if(sb>ad){
            var parts=s.split("-");
            if(parts.length>2){
                var sec = stringEval(parts.pop()); //need to do it this way so that the first part only includes what it needs to.
                return(stringEval(parts.join("-"))-sec);
            }
            else{
                return(stringEval(parts[0])-stringEval(parts[1])); 
            }
        }
        else{
            var parts=s.split("+");
            if(parts.length>2){
                return(+stringEval(parts.pop())+(+stringEval(parts.join("+"))));
            }
            else{
                return(+stringEval(parts[0])+(+stringEval(parts[1])));
            }
        }       
    }
    else if(s.includes("/")||s.includes("*")){
        var dv = s.lastIndexOf("/");
        var mp = s.lastIndexOf("*");
        if(dv>mp){
            var parts=s.split("/");
            if(parts.length>2){
                var sec = stringEval(parts.pop());
                return(stringEval(parts.join("/"))/sec);
            }
            else{
                return(stringEval(parts[0])/stringEval(parts[1]));
            }
        }
        else{
            var parts=s.split("*");
            if(parts.length>2){
                return(stringEval(parts.pop())*stringEval(parts.join("*")));
            }
            else{
                return(stringEval(parts[0])*stringEval(parts[1]));
            } 
        }
    }
    
}