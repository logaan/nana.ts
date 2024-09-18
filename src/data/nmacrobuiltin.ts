import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";
import { Complete } from "../process/complete";

export class NMacroBuiltin implements NData {
    body: (environment: Environment, args: Array<NData>) => NData;

    constructor(body: (environment: Environment, args: Array<NData>) => NData) {
        this.body = body;
    }

    evaluate(environment: Environment): Process {
        throw "I don't think there's any way to evaluate a Macro Builtin"
    }

    apply(args: Array<NData>): Process {
        throw "Macros have their own apply"
    }

    macroApply(environment: Environment, args: Array<NData>): Process {
        return new Complete(this.body(environment, args));
    }
}

