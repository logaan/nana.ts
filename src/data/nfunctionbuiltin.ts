import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";

export class NFunctionBuiltin implements NData {
    body: (args: Array<NData>) => Process;

    constructor(body: (args: Array<NData>) => Process) {
        this.body = body;
    }

    evaluate(environment: Environment): Process {
        throw "I don't think there's any way to evaluate a Function Builtin"
    }

    apply(args: Array<NData>): Process {
        return this.body(args)
    }
}

