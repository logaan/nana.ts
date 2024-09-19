import { NTuple } from "./data/collections/ntuple";
import { NList } from "./data/collections/nlist";
import { NMap } from "./data/collections/nmap";
import { Value } from "./data/types";
import { NString } from "./data/scalars/nstring";
import { NSymbol } from "./data/scalars/nsymbol";

// TODO: We need to keep whitespace so that it can stay in strings
export function tokenise(input: String) {
    const spreadWrappers = input.replace(/([\(\)\[\]\{\}"'])/g, ' $1 ').trim();
    return spreadWrappers.split(/\s+/);
}

export function parse(tokens: Array<String>, context: String | undefined = undefined) {
    const processed: Array<Value> = [];

    var next;
    while (next = tokens.shift()) {
        if (next === '(') {
            processed.push(new NTuple(parse(tokens, '(')))
        } else if (next === ')') {
            if (context === '(') {
                return processed;
            } else {
                throw "Closing a tuple that was not opened";
            }
        } else if (next === '[') {
            processed.push(new NList(parse(tokens, '[')))
        } else if (next === ']') {
            if (context === '[') {
                return processed;
            } else {
                throw "Closing a list that was not opened";
            }
        } else if (next === '{') {
            processed.push(new NMap(parseMap(tokens)))
        } else if (next === '}') {
            if (context === '}') {
                if (processed.length % 2 === 0) {
                    return processed;
                } else {
                    throw "Map did not have an even number of elements"
                }
            } else {
                throw "Closing a map that was not opened";
            }
        } else if (next === '"') {
            processed.push(new NString(parseString(tokens)))
        } else {
            processed.push(new NSymbol(next));
        }
    }

    return processed;

}

function parseMap(tokens: String[]) {
    const parsed = parse(tokens, '{');

    const parsedMap = new Map();
    for (var i = 0; i < parsed.length - 2; i += 2) {
        const key = parsed[i];
        const value = parsed[i + 1];

        parsedMap.set(key, value);
    }
    return parsedMap;
}

export function read(input: String) {
    return parse(tokenise(input));
}

function parseString(tokens: String[]): String {
    var result = "";

    var next;
    while (next = tokens.shift()) {
        if (next == '"') {
            return result;
        } else {
            result += next;
        }
    }

    throw "Reached the end without closing a string";
}
