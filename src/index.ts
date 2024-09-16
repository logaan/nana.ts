import * as fs from 'fs';
import { desugarFile } from './syntaxSugar';
import { read } from './read';
import { inspect } from 'util';
import { environment } from './standardLibrary';

function loadAndRun(path: fs.PathOrFileDescriptor) {
    console.log("--- " + path + " ---")
    const file = fs.readFileSync(path, 'utf8');
    const desugared = desugarFile(file);
    const parsed = read(desugared);

    // console.log(inspect(parsed, { showHidden: false, depth: null, colors: true }))

    const evaluated = parsed[0].evaluate(environment);
    // console.log(inspect(evaluated, { showHidden: false, depth: null, colors: true }))
}

loadAndRun('./examples/01-hello-world.nana')
loadAndRun('./examples/02-hello-function.nana')
loadAndRun('./examples/03-hello-macro.nana')
loadAndRun('./examples/04-hello-module.nana')
loadAndRun('./examples/05-tail-call-recursion.nana')
