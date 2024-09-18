import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";
import { Complete } from "../process/complete";

export class NFunctionBuiltin implements NData {
    body: (args: Array<NData>) => NData;

    constructor(body: (args: Array<NData>) => NData) {
        this.body = body;
    }

    evaluate(environment: Environment): Process {
        throw "I don't think there's any way to evaluate a Function Builtin"
    }

    apply(args: Array<NData>): Process {
        return new Complete(this.body(args))
    }
}

