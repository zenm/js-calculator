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
  showNumberInDisplay(0);
}

//used to put values into display
function showNumberInDisplay(number){
  var lengthOfDisplayValue = number.length;
  console.log(lengthOfDisplayValue);
  // if (number.indexOf(".") != -1){
  //
  // }
  // allow for 8 places with a decimal
  // run checks on number to see if allowable.

  return document.getElementById("value").textContent = number;

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
  hasTooManyDigits = false;
  showBreadcrumbs("");
  showNumberInDisplay(currentValue);
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
  /*if (currentValueLength > 9){
    tooManyDigits();
  }
  else */if (currentValue == "0") {
    showNumberInDisplay(numberPressed) ;
    currentValue = getCurrentValue();
  } else {
    showNumberInDisplay(currentValue + numberPressed);
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
var hasTooManyDigits = false;

// capture operator and previous value to evaluate
function applyOperator(operator) {
  currentValue = getCurrentValue();
  if (hasPrevValue == true){
    doMath(currentValue, previousValue, operatorPressed, "none")
  }
  operatorPressed = operator.childNodes[1].textContent;
  previousValue = currentValue;
  showBreadcrumbs(previousValue + " " + operatorPressed);
  lastThingPressed = "operator";
  hasPrevValue = true;
}

function getBreadCrumb() {
  return document.getElementById("breadcrumb").textContent;
}

function showBreadcrumbs(info) {
  return currentBreadCrumb = document.getElementById("breadcrumb").textContent = info;
}

// dictionary to do math given multiple inputs.
var doOperations = {
  "+" : function(x,y){return x + y},
  "-" : function(x,y){return y - x},
  "*" : function(x,y){return x * y},
  "/" : function(x,y){return x / y}
}

/*****    doMath()
** value1 : the current value in the display
** value2 : the previous value in the calculator's memory
** operator : the operation to do
** value : used to find weather reference to this points to "none" or the element in the DOM. This will determine equals calculations.
****************/
var hasDoneMath = false;
function doMath(value1, value2, operator, value) {
  var isEquals = value == "none"? "": value.childNodes[1].textContent;
  if (isEquals == "=") {
    clearBreadCrumb();
  }
  var x = parseFloat(value1);
  var y = parseFloat(value2);
  result = doOperations[operator](x,y);
  // add conditional to check if value is too large.
  if (result.toString().length > 10){
    tooManyDigits();
  } else {
    currentValue = result;
    showNumberInDisplay(currentValue);
    hasDoneMath = true;
    hasPrevValue = false;
  }
}

// used to clear bread crumbs
function clearBreadCrumb() {
  showBreadcrumbs("");
}

// remove one character on display
function backSpace() {
  var displayValue = getCurrentValue();
  showNumberInDisplay(displayValue.substring(0, displayValue.length - 1))
}

function addRemoveNegative() {
  var displayValue = getCurrentValue();
  if (displayValue == "0"){
    // do nothing
  } else {
    displayValue = displayValue[0] == ["-"]? displayValue.substring(1,) : "-" + displayValue;
  }
  currentValue = displayValue;
  showNumberInDisplay(displayValue);
}

function tooManyDigits() {
  clearAll();
  showBreadcrumbs("too many numbers");
  hasTooManyDigits = true;
}
