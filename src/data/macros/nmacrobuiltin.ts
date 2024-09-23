import { Complete, Process } from "../../process/types";
import { Environment, Macro, Value } from "../types";

export class NMacroBuiltin implements Value, Macro {
    body: (environment: Environment, args: Array<Value>) => Process;

    constructor(body: (environment: Environment, args: Array<Value>) => Process) {
        this.body = body;
    }

    evaluate(_environment: Environment) {
        return new Complete(this);
    }

    macroApply(environment: Environment, args: Array<Value>): Process {
        return this.body(environment, args);
    }
}
