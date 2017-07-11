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
  var stringNumber = number.toString();
  var lengthOfValue = stringNumber.length;
  if (number > 9999999999 || number <= -9999999999) {
    return hasTooManyDigits = true;
  } else {
  stringNumber = stringNumber.substring(0,11);
  return document.getElementById("value").textContent = stringNumber;
  }
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

function showButtonPress(value) {
  removeWarning();
  var numberPressed = value.childNodes[1].textContent;
  // clear old calculation.
  if (hasDoneMath){
    clearEntry();
    hasDoneMath = false;
  }
  //reset entry if you pressed an operator as your previous entry and you have a previous value
  if (lastThingPressed == "operator" && hasPrevValue == true) {
    clearEntry();
  }
  currentValue = getCurrentValue();
  var currentValueLength = currentValue.length;
  if (currentValueLength > 9) {
    showWarning(warningMessage);
  }

  // show zero in the display, unless you write over it.
  if (currentValue == "0") {
    showNumberInDisplay(numberPressed) ;
    currentValue = getCurrentValue();
  } else {
    showNumberInDisplay(currentValue + numberPressed);
    currentValue = getCurrentValue();
  }
  lastThingPressed = "operand";
    // return currentValue;
}

var previousValue = 0;
var operatorPressed = "";
var result = 0;
var hasPrevValue = false;
var lastThingPressed ="";
var hasTooManyDigits = false;
var warningMessage = "too many numbers";

// capture operator and previous value to evaluate
function applyOperator(operator) {
  currentValue = getCurrentValue();
  console.log(operatorPressed);
  if (hasPrevValue == true) {
    console.log(currentValue + ","+ previousValue + "," + operatorPressed);
    doMath(previousValue, currentValue, operatorPressed, "none")
  }
  if (hasTooManyDigits == true){
    return showWarning(warningMessage);
  } else {
  operatorPressed = operator.childNodes[1].textContent;
  console.log(operatorPressed);
  previousValue = currentValue;
  showBreadcrumbs(previousValue + " " + operatorPressed);
  lastThingPressed = "operator";
  hasPrevValue = true;
  }
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
  "-" : function(x,y){return x - y},
  "*" : function(x,y){return x * y},
  "/" : function(x,y){return x / y}
}

/*****    doMath()
** value1 : the current value in the display
** value2 : the previous value in the calculator's memory
** operator : the operation to do
** value : used to find whether reference to this points to "none" or the element in the DOM. This will determine equals calculations.
****************/
var hasDoneMath = false;
function doMath(value1, value2, operator, value) {
  console.log();
  var isEquals = value == "none"? "": value.childNodes[1].textContent;
  if (isEquals == "=") {
    clearBreadCrumb();
  }
  var x = parseFloat(value1);
  var y = parseFloat(value2);
  result = doOperations[operator](x,y);
    // add conditional to check if value is too large.
    // if (result.toString().length > 10){
    //   showWarning(warningMessage);
    // } else {
    currentValue = result;
    showNumberInDisplay(currentValue);
    hasDoneMath = true;
    hasPrevValue = false;
  // }
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

function showWarning(warningMessage) {
  clearAll();
  showBreadcrumbs(warningMessage);
  hasTooManyDigits = true;
}

function removeWarning() {
  if (getBreadCrumb() == warningMessage) {
    showBreadcrumbs("");
    hasTooManyDigits = false;
  }
}
