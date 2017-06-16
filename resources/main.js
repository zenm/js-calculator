//get the value on the page
function getCurrentValue() {
  return document.getElementById("value").textContent;
}

//function to clear entry
function clearEntry() {
  document.getElementById("value").textContent = "";
}

//function to clear all
function clearAll(){
  clearEntry();
  document.getElementById("value").textContent = "0";
  previousValue = 0;
  currentValue = 0;
}

//when I press a button, then I see that value show up in the display.
function buttonPress(value){
  var numberPressed = value.textContent;
  currentValue = getCurrentValue();
  if (currentValue == "0") {
    // var addToDisplay =  document.getElementById(numberPressed).textContent;
    document.getElementById("value").textContent = numberPressed;
    currentValue = getCurrentValue();
  } else if (currentValue != "0") {
    document.getElementById("value").textContent = currentValue + numberPressed;
    currentValue = getCurrentValue();
  }
  return currentValue;
}

var currentValue;
var previousValue;
var operandPressed;
// when I click on an operator, then the input goes out
function applyOperator(operand){
  previousValue = currentValue;
  operandPressed = operand.textContent;
  console.log(operandPressed);
  clearEntry();
}

var doOperations = {
  "+" : function(x,y){return x + y},
  "-" : function(x,y){return x - y},
  "*" : function(x,y){return x * y},
  "/" : function(x,y){return x / y}
}

function doMath(value1, value2, operand){
  //if response longer than 9 places, then display "digit limit reached"
  if(false){

  } else if (true){
  //if less than 9 places, then calculate.
    var x = parseInt(value1);
    var y = parseInt(value2);
    console.log(doOperations[operand](x,y));
  }

}
