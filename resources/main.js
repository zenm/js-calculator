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
  previousValue = 0;
  currentValue = 0;
  operandPressed = "";
  result = 0;
  hasDoneMath = false;
  hasPrevValue = false;
  document.getElementById("value").textContent = currentValue;
}
//when I press a button, then I see that value show up in the display.
function buttonPress(value){
  if (hasDoneMath){
    clearEntry();
    document.getElementById("value").textContent = numberPressed;
    currentValue = getCurrentValue();
    hasDoneMath = false;
  }
  var numberPressed = value.textContent;
  currentValue = getCurrentValue();
  if (currentValue == "0") {
    document.getElementById("value").textContent = numberPressed;
    currentValue = getCurrentValue();
  } else {
    document.getElementById("value").textContent = currentValue + numberPressed;
    currentValue = getCurrentValue();
  }
  console.log(currentValue);

  return currentValue;
}
var hasCurrValue = true;
var hasPrevValue = false;
var currentValue = 0;
var previousValue = 0;
var operandPressed = "";
var result = 0;

// when I click on an operator, then the input goes out
// when I click on an operator, and I've inputed values before, then I can keep chaining operations.
function applyOperator(operand) {
  if (hasCurrValue && hasPrevValue) {
    doMath(currentValue, previousValue, operandPressed);
  } else {
  operandPressed = operand.textContent;
  hasPrevValue = true;
  previousValue = currentValue;
  clearEntry();
  }
}

// dictionary to do math given multiple inputs.
var doOperations = {
  "+" : function(x,y){return x + y},
  "-" : function(x,y){return x - y},
  "*" : function(x,y){return x * y},
  "/" : function(x,y){return x / y}
}


var hasDoneMath = false;
function doMath(value1, value2, operand){
  if(false){
    //if response longer than 9 places, then display "digit limit reached"
  } else if (true){
    //if less than 9 places, then calculate.
    var x = parseFloat(value1);
    var y = parseFloat(value2);
    result = doOperations[operand](x,y);
    currentValue = result;
    document.getElementById("value").textContent = currentValue;
    hasDoneMath = true;
  }
}
