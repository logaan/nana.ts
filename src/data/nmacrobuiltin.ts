import { NData } from "./ndata";
import { Environment } from "./environment"

export class NMacroBuiltin {
    body: (environment: Environment, args: Array<NData>) => NData;

    constructor(body: (environment: Environment, args: Array<NData>) => NData) {
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Macro Builtin"
    }

    apply(args: Array<NData>): NData {
        throw "Macros have their own apply"
    }

    macroApply(environment: Environment, args: Array<NData>): NData {
        return this.body(environment, args);
    }
}

