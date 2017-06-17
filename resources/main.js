//get the value on the page
function getCurrentValue() {
  return document.getElementById("value").textContent;
}

//function to clear entry
function clearEntry() {
  document.getElementById("value").textContent = "0";
}

//function to clear all
function clearAll(){
  clearEntry();
  previousValue = 0;
  currentValue = 0;
  operatorPressed = "";
  result = 0;
  hasDoneMath = false;
  hasPrevValue = false;
  displayToBreadcrumbs("");
  document.getElementById("value").textContent = currentValue;
}

var currentValue = 0;
//when I press a button, then I see that value show up in the display.

function buttonPress(value){
  var numberPressed = value.textContent;

  if (hasDoneMath){
    clearEntry();
    document.getElementById("value").textContent = numberPressed;
    currentValue = getCurrentValue();
    hasDoneMath = false;
  }
  //reset entry if you pressed and operator and you have a previous value
  if (lastThingPressed == "operator" && hasPrevValue == true){
    clearEntry();
    console.log("Do I get here?");
  }
  currentValue = getCurrentValue();
  if (currentValue == "0") {
    document.getElementById("value").textContent = numberPressed;
    currentValue = getCurrentValue();
  } else {
    document.getElementById("value").textContent = currentValue + numberPressed;
    currentValue = getCurrentValue();
  }
  lastThingPressed = "operand";
  return currentValue;

}

var previousValue = 0;
var operatorPressed = "";
var result = 0;
var hasPrevValue = false;
var lastThingPressed ="";

// when I click on an operator, then I've recorded the operator sign
function applyOperator(operator) {
  //capture operator in variable
  operatorPressed = operator.textContent;
  currentValue = getCurrentValue();
  if (hasPrevValue == true){
    console.log("currentValue" + currentValue +" + "+"previousValue " + previousValue);
    
  }

  previousValue = currentValue;

  displayToBreadcrumbs(getBreadCrumb()+" " + previousValue + " " + operatorPressed);
  lastThingPressed = "operator";
  hasPrevValue = true;
}
function getBreadCrumb(){
  return document.getElementById("breadcrumb").textContent;
}

function displayToBreadcrumbs(info){
  return currentBreadCrumb = document.getElementById("breadcrumb").textContent = info;
}

// dictionary to do math given multiple inputs.
var doOperations = {
  "+" : function(x,y){return x + y},
  "-" : function(x,y){return x - y},
  "*" : function(x,y){return x * y},
  "/" : function(x,y){return x / y}
}


var hasDoneMath = false;
function doMath(value1, value2, operator){

  if(false){
    //if response longer than 9 places, then display "digit limit reached"
  } else if (true){
    //if less than 9 places, then calculate.
    var x = parseFloat(value1);
    var y = parseFloat(value2);
    result = doOperations[operator](x,y);
    currentValue = result;
    document.getElementById("value").textContent = currentValue;
    hasDoneMath = true;
  }
}
function pressedEqual(){
  displayToBreadcrumbs("");
}
