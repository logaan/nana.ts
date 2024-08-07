import * as fs from 'fs';
import { desugarFile } from './syntaxSugar';
import { read } from './read';
import { inspect } from 'util';

const path = './examples/01-hello-world.nana';
const helloWorld = fs.readFileSync(path, 'utf8');
const desugared = desugarFile(helloWorld);
const parsed = read(desugared);

console.log(inspect(parsed, { showHidden: false, depth: null, colors: true }))
