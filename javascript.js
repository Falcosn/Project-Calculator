
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case ".":
      decimalFun()
      break;
    case "r":
    case "R":
      clearFun()
      break;
    case "c":
      changeValue()
      break;
    case "Backspace":
      deleteFun()
      break;
    case "=":
    case "Enter":
      equalFun()
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      numberFun(event.key, true)
      break;
    case "+":
    case "-":
      operatorFun(event.key, true)
      break;
    case "*":
      operatorFun("x", true)
      break;
    case "/":
      operatorFun("÷", true)
      break;
  }
})

function add (num0, num1) 
{
  return num0 + num1
}

function subtract (num0, num1)  
{
  return num0 - num1
}

function multiply (num0, num1)  
{
  return num0 * num1
}

function divide (num0, num1)  
{
  return num0 / num1
}

function getResult (operator, num0, num1)
{
  switch (operator) {
    case '+':
      return add(num0, num1)
    case '-':
      return subtract(num0, num1)
    case 'x':
      return multiply(num0, num1)
    case '÷':
      return divide(num0, num1)
  }
}


const ButtonNumbers = document.querySelectorAll('.number')
const ButtonOperators = document.querySelectorAll('.operator')

const ButtonDecimal = document.querySelector('#decimal')
const ButtonEqual = document.querySelector('#equal')
const ButtonDelete = document.querySelector('#backspace')
const ButtonClear = document.querySelector('#clear')

const ButtonPercentage = document.querySelector('#percentage')
const ButtonChangeValue = document.querySelector('#changeValue')

const Display = document.querySelector('#display')

let firstNum = "0"
let secondNum = ""
let operator = ""
let isFirstNum = true



function displayShow()
{
  if (isFirstNum) {Display.innerHTML = firstNum}
  else {Display.innerHTML = secondNum}
  handleError()
  checkClass(true)
}

function handleError() {
  if (isNaN(firstNum) || firstNum == "Infinity" || firstNum == "-Infinity")
  {
    firstNum = "0"
    Display.innerHTML = "Error";
  }
}

function checkClass(forDelete)
{
  if (forDelete) {
    for (let i = 0; i < ButtonOperators.length; i++) {
      ButtonOperators[i].classList.remove("isOn")
    }
  } else {
    for (let i = 0; i < ButtonOperators.length; i++) {
      if (ButtonOperators[i].classList.contains("isOn")) {return true;}
    }
  }
  
}

 function changeValue() {
   if (isFirstNum && firstNum !== "0") {
     if (firstNum[0] !== "-") {firstNum = "-" + firstNum}
     else {firstNum = firstNum.slice(1)}
     displayShow()
   }
   else if (!isFirstNum && secondNum !== "0") {
     if (secondNum[0] !== "-") {secondNum = "-" + secondNum}
     else {secondNum = secondNum.slice(1)}
     displayShow()
   }
 }

function percentage() { //to string
  if (isFirstNum && firstNum !== "0") {
    firstNum = Math.round((firstNum * 0.01) / 10 ** 2).toString()
    displayShow()
  }
  else if (!isFirstNum && secondNum !== "0") {
    secondNum = Math.round((secondNum * 0.01) / 10 ** 2).toString()
    displayShow()
  }
}

function decimalFun() 
{
  if (isFirstNum) {
    if (!(firstNum.includes('.'))) {firstNum += "."}
  }
  else {
    if (secondNum == "") (secondNum = "0")
    if (!(secondNum.includes('.'))) {secondNum += "."}
  }

  displayShow()
}

function clearFun() {
  secondNum = ""
  firstNum = "0"
  operator = ""
  isFirstNum = true
  displayShow()
  checkClass(true)
}

function deleteFun() {
  if (isFirstNum) {
   firstNum = firstNum.slice(0, -1)
   if (firstNum == "") {firstNum = "0"}
  }
  else {
   secondNum = secondNum.slice(0, -1)
   if (secondNum == "") {secondNum = "0"}
  }
  displayShow()
}

function equalFun() {

  if (firstNum != "" && secondNum != "") {
    isFirstNum = true
    firstNum = getResult(operator, parseFloat(firstNum), parseFloat(secondNum))
    firstNum = Math.round(firstNum * 10 ** 2) / 10 ** 2
    secondNum = ""
    firstNum = String(firstNum)

    displayShow()
  }  
}

function numberFun(button, isKey) {

  if (checkClass(false)) {isFirstNum = false} // check if operator is active if is the number is second

  if (isFirstNum) {
    if (firstNum == "0") {firstNum = ""}
    isKey ? firstNum += button : firstNum += button.innerHTML
  }
  else {
    if (secondNum == "0") {secondNum = ""}
    isKey ? secondNum += button : secondNum += button.innerHTML
  }

  displayShow()
}

function operatorFun(button, isKey) {
  equalFun() 
  if (isKey) { // if key sett what button is it
    for (let i = 0; i <= ButtonOperators.length; i++) {
      if (ButtonOperators[i].innerHTML == button) {
        button = ButtonOperators[i]
        break;
      }
    }
  }
  
  if (Display.innerHTML !== "Error") {

    if (button.classList.contains("isOn")) {
      button.classList.remove("isOn")
    }
    else {
      checkClass(true)
      button.classList.add("isOn")
    }
  
    operator = button.innerHTML 
  }
}

ButtonChangeValue.addEventListener('click', changeValue)

ButtonPercentage.addEventListener('click', percentage)

ButtonDecimal.addEventListener('click', decimalFun) 

ButtonClear.addEventListener('click', clearFun)

ButtonDelete.addEventListener('click', deleteFun)

ButtonEqual.addEventListener('click', equalFun)

ButtonNumbers.forEach((button) => {
  button.addEventListener('click', () => {numberFun(button, false)})
})

ButtonOperators.forEach((button) => { 
  button.addEventListener('click', () => {operatorFun(button, false)})
})

displayShow()