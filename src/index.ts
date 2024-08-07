import * as fs from 'fs';
import { desugarFile } from './syntaxSugar';
import { tokenise } from './token';

const path = './examples/01-hello-world.nana';
const helloWorld = fs.readFileSync(path, 'utf8');
const desugared = desugarFile(helloWorld);
const tokens = tokenise(desugared);

console.log(tokens);
