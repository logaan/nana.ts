const greeting = "Hello"

function greet(name) {
  console.log(greeting + name)
}

const fnText = greet("Logan")

function ignore(expression) {
  console.log("Printing what I want instead")
}

const macroTest = ignore(console.log("This text won't be printed"))
