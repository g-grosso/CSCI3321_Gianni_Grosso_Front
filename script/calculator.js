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
    //Full explanation of how this works. It's far more complicated than it should have been, so this is also to make sure I understand it.
    //Step 1: Find the last operation in the equation based off the order of operations.
    //      Done by seeing if the string includes each one. For each level, it determines the last index of each operator at that level.
    //Step 2: Split it by that operator, and, if it got split in more than one place, recombine the other ones back together.
    //      Done by popping out the last split piece (the 2nd operand of the operator we need, and then recombining the rest.)
    //Step 3: Recursively call the method on each piece.
    //      If one piece is just a number, it will be returned.
    //Due to the way operators are worked on in the stack, the code going for the last operator first results in it being solved last.
    //Example: 12+6/2-1+2
    //Contains - and/or +, last index of each 6 and 8 respectively. Split by +.
    //Split results:  12, 6/2-1, 2. Pop 2 and save it for later, array now just 12,6/2-1.
    //Join the rest of the parts together with a +, and recursively call the method on 12+6/2-1 and 2, then add together.
    // 2 is a number, so it gets returned. 12+6/2-1 again contains a - and/or +, new indices 6 and 2, so split by -.
    // Results: 12+6/2,1. Since no need to recombine, immediate recursive call on each half, then subtract.
    // 1 gets returned, 12+6/2 contains - and/or +, indices -1 and 2, split by +, call recursively on each half.
    // 12 gets returned, 6/2 contains / and/or *, indices 1 and -1, split by /, call recursively on 6 and 2.
    // 6 and 2 both return, that iteration does the math and returns 3, previous iteration now able to return 12+3 = 15, previous iteration now able to return 15-1=14, first iteration now able to return 14+2=16, which is correct.
}