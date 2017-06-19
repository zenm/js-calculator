// function setDimensions(){
//   var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//   var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
//   var screenHeight = h + "px";
//   document.getElementById("calculator").style.height = screenHeight;
// }
// setDimensions();

//get the value on the page
function getCurrentValue() {
  return document.getElementById("value").textContent;
}

//used to to clear entry
function clearEntry() {
  document.getElementById("value").textContent = "0";
}

//used to clear all current and previous display entries
function clearAll() {
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

// show button presses on display
function buttonPress(value) {
  var numberPressed = value.childNodes[1].textContent;

  if (hasDoneMath){
    clearEntry();
    hasDoneMath = false;
  }

  //reset entry if you pressed an operator and you have a previous value
  if (lastThingPressed == "operator" && hasPrevValue == true) {
    clearEntry();
  }
  currentValue = getCurrentValue();
  currentValueLength = currentValue.length;
  if (currentValueLength > 9){
    tooManyDigits();
  }
  else if (currentValue == "0") {
    document.getElementById("value").textContent = numberPressed;
    currentValue = getCurrentValue();
  } else {
    document.getElementById("value").textContent = currentValue + numberPressed;
    currentValue = getCurrentValue();
  }
  lastThingPressed = "operand";
  console.log(currentValue);
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
    doMath(currentValue, previousValue, operatorPressed, "none")
  }
  operatorPressed = operator.childNodes[1].textContent;
  previousValue = currentValue;
  displayToBreadcrumbs(previousValue + " " + operatorPressed);
  lastThingPressed = "operator";
  hasPrevValue = true;
}

function getBreadCrumb() {
  return document.getElementById("breadcrumb").textContent;
}

function displayToBreadcrumbs(info) {
  return currentBreadCrumb = document.getElementById("breadcrumb").textContent = info;
}

// dictionary to do math given multiple inputs.
var doOperations = {
  "+" : function(x,y){return x + y},
  "-" : function(x,y){return y - x},
  "*" : function(x,y){return x * y},
  "/" : function(x,y){return x / y}
}

var hasDoneMath = false;

function doMath(value1, value2, operator, value) {
  console.log(value1, value2);
  var isEquals = value == "none"? "": value.childNodes[1].textContent;
  if (isEquals == "=") {
    clearBreadCrumb();
  }
  var x = parseFloat(value1);
  var y = parseFloat(value2);
  result = doOperations[operator](x,y);
  console.log(result);
  currentValue = result.toString().length > 10? result.toFixed(8): result;
  document.getElementById("value").textContent = currentValue;
  hasDoneMath = true;
  hasPrevValue = false;
}

// used to clear bread crumbs
function clearBreadCrumb() {
  displayToBreadcrumbs("");
}

// remove one character on display
function backSpace() {
  var displayValue = getCurrentValue();
  document.getElementById("value").textContent = displayValue.substring(0, displayValue.length - 1)
}

function addRemoveNegative() {
  var displayValue = getCurrentValue();
  if (displayValue == "0"){
    // do nothing
  } else {
    displayValue = displayValue[0] == ["-"]? displayValue.substring(1,) : "-" + displayValue;
  }
  currentValue = displayValue;
  document.getElementById("value").textContent = displayValue;
}

function tooManyDigits() {
  clearAll();
  displayToBreadcrumbs("too many numbers");
}
