import * as fs from 'fs';
import * as ss from './syntaxSugar';

const path = './examples/01-hello-world.nana';
const helloWorld = fs.readFileSync(path, 'utf8');
const desugared = ss.desugarFile(helloWorld);

console.log(desugared);
