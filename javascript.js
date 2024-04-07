
function add (num0, num1) 
{
  //return numbers.reduce((result, number) => {
  //  return result + number
  //})

  return num0 + num1
}



function subtract (num0, num1)  
{
  //return numbers.reduce((result, number) => {
  //  return result - number
  //})

  return num0 - num1
}



function multiply (num0, num1)  
{
  //return numbers.reduce((result, number) => {
  //  return result * number
  //})

  return num0 * num1
}



function divide (num0, num1)  
{
  //return numbers.reduce((result, number) => {
  //  return result / number
  //})

  return num0 / num1
}

//Create a new function operate that takes an operator and 2 numbers and then calls
//one of the above functions on the numbers.

function operator (operator, num0, num1)
{
  switch (operator) {
    case '+':
      return add(num0, num1)
    case '-':
      return subtract(num0, num1)
    case '*':
      return multiply(num0, num1)
    case '/':
      return divide(num0, num1)
  }
}

console.log(operator("/",5,5))
