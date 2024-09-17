import { desugarFile } from './syntaxSugar';
import { read } from './read';
import { environment } from './standardLibrary';

export function execute(file: String) {
    const desugared = desugarFile(file);
    const parsed = read(desugared);
    const evaluated = parsed[0].evaluate(environment);
    return "ok";
}

export function test(): String {
    return execute(`
        Module hello-world[]

        greeting   "Hello"
        greet      Fn([name] print(greeting name))
        fn-test    greet("Logan")
        Ignore     Macro([expression] print("Printing what I want instead"))
        macro-test Ignore(print("This text won't be printed"))
    `);
}

export const run = {
    run: test
}
