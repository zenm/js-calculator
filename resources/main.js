function setDimensions(){
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var screenHeight = h + "px";
  document.getElementById("calculator").style.height = screenHeight;
}
setDimensions();

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
    hasDoneMath = false;
  }

  //reset entry if you pressed an operator and you have a previous value
  if (lastThingPressed == "operator" && hasPrevValue == true){
    clearEntry();
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

// capture operator and previous value to evaluate
function applyOperator(operator) {
  currentValue = getCurrentValue();
  if (hasPrevValue == true){
    doMath(currentValue, previousValue, operatorPressed, "!=")
  }
  operatorPressed = operator.textContent;
  previousValue = currentValue;
  displayToBreadcrumbs(previousValue + " " + operatorPressed);
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
function doMath(value1, value2, operator, value){
  var isEquals = value.textContent;
  if (isEquals == "="){
    clearBreadCrumb();
  }
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
    hasPrevValue = false;
  }
}

// used to clear bread crumbs
function clearBreadCrumb(){
  displayToBreadcrumbs("");
}

// remove one character on display
function backSpace(){
  var displayValue = getCurrentValue();
  document.getElementById("value").textContent = displayValue.substring(0, displayValue.length - 1)
}
