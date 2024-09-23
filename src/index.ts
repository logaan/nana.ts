import { desugarFile } from './syntaxSugar';
import { read } from './read';
import { environment } from './standardLibrary';
import { runUntilComplete } from './process/types';

export function execute(file: String) {
    const desugared = desugarFile(file);
    const parsed = read(desugared);
    return parsed[0].evaluate(environment)
}

// TODO: We need a way for new threads to trickle all the way back up to the
// top.

// TODO: Macros need to stop using runUntilComplete. It means they're blocking
// until they're done. And we need the macro for recursion.
export function test(): String {
    const thread1 = execute(`
        Module hello-world[]

        greeting   "Hello"
        greet      Fn([name] print(greeting name))
        fn-test    greet("Logan")

        Ignore     Macro([expression] print("Printing what I want instead"))
        macro-test Ignore(print("This text won't be printed"))
    `);

    runUntilComplete(thread1);

    return "ok";
}

export function threadTest(): String {
    const thread1 = execute(`
        Module hello-world[]

        loop       Fn([] print("printing_from_thread_one...") loop())
        loop-test  loop()
    `);

    const thread2 = execute(`
        Module thread-two[]

        loop       Fn([] print("printing_from_thread_two...") loop())
        loop-test  loop()
    `);

    runUntilComplete(thread1, thread2);

    return "ok";
}

export const run = {
    run: threadTest
}
