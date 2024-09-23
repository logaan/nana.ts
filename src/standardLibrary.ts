import { NList } from "./data/collections/nlist";
import { NFunction } from "./data/functions/nfunction";
import { NFunctionBuiltin } from "./data/functions/nfunctionbuiltin";
import { NMacro } from "./data/macros/nmacro";
import { NMacroBuiltin } from "./data/macros/nmacrobuiltin";
import { NString } from "./data/scalars/nstring";
import { NSymbol } from "./data/scalars/nsymbol";
import { Environment, Value } from "./data/types";
import { startEvaluatingList } from "./process/evalArrayThen";
import { Complete, Process, Running, runUntilComplete } from "./process/types";

export const environment: Map<String, Value> = new Map();

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

    return new Complete(new NFunction(env, functionArguments, macroArgs.slice(1)));
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

    return new Complete(new NMacro(functionArguments, macroArgs.slice(1)));
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

    return new ModuleStep(env, definitions);
}));

class ModuleStep implements Running {
    rollingEnv: Environment;
    definitions: Value[];

    // TODO: We need a running process
    // TODO: Functions may need a mutable environment field so they can recur
    // because their definition may take many steps 
    constructor(rollingEnv: Environment, definitions: Value[]) {
        this.rollingEnv = rollingEnv;
        this.definitions = definitions;
    }

    step(): Process {
        if (this.definitions.length === 0) {
            return new Complete(new NString("Module is done"));
        } else {
            const name = this.definitions[0];

            if (!(name instanceof NSymbol)) {
                throw "Module definition names must be symbols"
            }

            const valueExpression = this.definitions[1];
            const newEnv = new Map(this.rollingEnv);
            const value = valueExpression.evaluate(newEnv);

            // TODO: There should really be a version of this for single values
            return startEvaluatingList([valueExpression], newEnv, (values: Value[]): Process => {
                const value = values[0];
                newEnv.set(name.name, value);

                return new ModuleStep(newEnv, this.definitions.slice(2))
            });
        }
    }

}

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
