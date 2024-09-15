class HelloWorld
  @greeting = "Hello"

  def greet(name)
    print @greeting + name
  end

  @fnText = greet("Logan")

  def ignore(expression)
    print "Printing what I want instead"
  end

  @macroTest = ignore(print("This text won't be printed"))
end
