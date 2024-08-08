import { NData, NFunction, NFunctionBuiltin, NMacro, NMacroBuiltin, NString, NSymbol, NList } from './data';

export const environment: Map<String, NData> = new Map();

environment.set("Fn", new NMacroBuiltin((env, macroArgs) => {
    const functionArguments: Array<String> = [];

    const firstArg = macroArgs[0];
    if (firstArg instanceof NList) {
        firstArg.contents.forEach((macroArg) => {
            if (macroArg instanceof NSymbol) {
                functionArguments.push(macroArg.name);
            } else {
                throw "The first argument to Fn must be a List of Symbols"
            }
        })
    } else {
        throw "The first argument to Fn must be a List"
    }

    return new NFunction(env, functionArguments, macroArgs.slice(1));
}))

environment.set("Macro", new NMacroBuiltin((env, macroArgs) => {
    const functionArguments: Array<String> = [];

    const firstArg = macroArgs[0];
    if (firstArg instanceof NList) {
        firstArg.contents.forEach((macroArg) => {
            if (macroArg instanceof NSymbol) {
                functionArguments.push(macroArg.name);
            } else {
                throw "The first argument to Macro must be a List of Symbols"
            }
        })
    } else {
        throw "The first argument to Macro must be a List"
    }

    return new NMacro(functionArguments, macroArgs.slice(1));
}))

environment.set("Module", new NMacroBuiltin((env, args) => {
    if (args.length < 2) {
        throw "Module needs a name and a list of imports"
    }

    const name = args[0];
    if (!(name instanceof NSymbol)) {
        throw "Module names must be symbols"

    }

    const imports = args[1];
    if (!(imports instanceof NList)) {
        throw "Module imports must be a list"

    }

    const definitions = args.slice(2);

    if (definitions.length % 2 != 0) {
        throw "Module definitions must come in pairs of names and values"
    }

    var rollingEnv = new Map(env);
    for (var i = 0; i <= definitions.length - 2; i += 2) {
        const name = definitions[i];

        if (!(name instanceof NSymbol)) {
            throw "Module definition names must be symbols"
        }

        const valueExpression = definitions[i + 1];
        const value = valueExpression.evaluate(rollingEnv);

        rollingEnv = new Map(rollingEnv);
        rollingEnv.set(name.name, value);
    }

    return new NString("This would normally define a module called " + name.name);
}));

// TODO: This shouldn't be available without a wasm component
environment.set("print", new NFunctionBuiltin((args) => {
    args.forEach((arg) => {
        if (arg instanceof NString) {
            console.log(arg.value);
        } else {
            throw "TODO: Print things other than strings"
        }
    })

    return new NString("ok");
}))