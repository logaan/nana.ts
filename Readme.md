# Nana.ts

This is an experimental programming language. It is not suitable for production use.

## Syntax

Nana is in the Lisp family of languages. There is a layer of syntax sugar to make
it more famililar to developers not comfortable with Lisp.

The top level expression in a file can omit parenthesis. This allows us Module definitions without unnessisary indentation of all following code.

Functions can be called like `print("Hello world")`.

``` haskell
Module hello-world []

greeting "Hello"

greet Fn([name]
  print(greeting name))

test greet("World")
```

This example defines a module called `hello-world`.

The empty list `[]` declares this module has no imports.

The name `greeting` is assigned the value `"Hello"`.

The name `greet` is assigned to a function that prints the `greeting` we defined above, and a name provided when the `Fn` is called.

We call `greet` as we define `test`. `"Hello World"` is printed to the screen.

## Design goals

Nana will be a small, highly sandboxed language that can run in many environments. The interpreter will compile to WASM and allow for modules to be bundled with the interpreter as WASM Components.

By default code can not print to the screen, read from disk, communicate over the network, etc. A module must ask to be given this capability. Higher level code may provide direct access, proxy implementations, or mocks that expose the same interface. This will follow the [WASM component interface](https://component-model.bytecodealliance.org/design/wit.html) model.

Nana will not provide features for programs to have private mutable state. Instead programs that require state must make use of globally visible, transactional, snapshotable state. This follows ideas from [Out of the Tar Pit](https://github.com/papers-we-love/papers-we-love/blob/main/design/out-of-the-tar-pit.pdf) and [Erlang Term Stores](https://www.erlang.org/docs/23/man/ets).

Nana will support macros, green threads, tail call optimisation, continuations, and a debugger. Core data types will be immutable. It will be embedable into other languages, and be able to run in web browsers.

## Installation

    cargo install wepl --locked
    cargo install --git https://github.com/bytecodealliance/wasi-virt


# TODO

- [ ] Macros should return an s-expression and then have it evaluated, rather than just evaluating code as part of their body. Then we can macro-expand to view the results.