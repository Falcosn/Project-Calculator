
const ButtonNumbers = document.querySelectorAll('.number')
const ButtonOperators = document.querySelectorAll('.operator')

const ButtonDecimal = document.querySelector('#decimal')
const ButtonEqual = document.querySelector('#equal')
const ButtonDelete = document.querySelector('#backspace')
const ButtonClear = document.querySelector('#clear')
const Display = document.querySelector('#display')

let numbers = "" 
let array = []
let i = 0 


document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case ".":
      decimalFun()
      break;
    case "r":
    case "R":
      clearFun()
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

function ChoseCalculation (operator, num0, num1)
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

function displayShow()
{
  Display.innerHTML = array.join(" ");
}

function checkForOperator()
{
  return array[i] == "+" || array[i] == "-" || array[i] == "x" || array[i] == "÷" || array[i] == undefined
}

function decimalFun() 
{
  if (typeof array[i] !== "undefined") { // first array is undefined so to not get error

    if (!(array[i].includes('.')) && !checkForOperator())
    {
      numbers += ButtonDecimal.innerHTML //add context of button to numbers
      array[i] = numbers
    }
    
    displayShow()
  }  
}

function clearFun() {
  i = 0
  numbers = ""
  array = []
  displayShow()
}

function deleteFun() {
  if (typeof array[i] !== "undefined" && array[i] !== "Infinity" && array[i] !== "Error") {// first array is undefined so to not get error

    if (array[i].length <= 1) {
      let IsOperator = checkForOperator()
      if (array[0].charAt(0) == "-") {array[i] = array[i].slice(0, -1)}
      numbers = numbers.slice(0, -1)
      if (i > 0) {i--}
      if (IsOperator) {numbers = array[i]}
      array.pop();
    }
    else {
      array[i] = array[i].slice(0, -1)
      numbers = numbers.slice(0, -1)
    }
  
    displayShow()
}}

function equalFun() {
  if (i >= 2 && !checkForOperator()) {

    i = 0
    numbers = ""
  
    const final = array.reduce((firstNumber, currentValue, index, arr) => {
     
      secondNumber = parseFloat(arr[2])
      arr.splice(2, 1)
      
      operator = arr[1]
      arr.splice(1, 1)
  
      return ChoseCalculation(operator, firstNumber, secondNumber)
    }, parseFloat(array[0]))
    
      array = []
      if (isNaN(final)) {
        Display.innerHTML = "Error"
      }
      else if (final == "Infinity") {
        Display.innerHTML = "Infinity"
      }
      else {
        numbers += parseFloat(Math.round(final * 10 ** 2) / 10 ** 2)
        array[i] = numbers
        displayShow()
      }
      
    }
}

function numberFun(button, isKey) {
  if (numbers == "0") {
    array[i] = array[i].slice(0, -1)
    numbers = numbers.slice(0, -1)
  }
  if (checkForOperator() && i != 0) {
    i++;
  }

  isKey ? numbers += button : numbers += button.innerHTML //add context of button to numbers
  array[i] = numbers
  
  displayShow()
}

function operatorFun(button, isKey) {
  if (!checkForOperator())
    {    
      numbers = ""
      i++
      isKey ? array[i] = button : array[i] = button.innerHTML // is undefined because innerHTML of event.key is undefined

      displayShow()
    }
}

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
