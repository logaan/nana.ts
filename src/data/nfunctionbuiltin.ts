import { NData } from "./ndata";
import { Environment } from "./environment"

export class NFunctionBuiltin {
    body: (args: Array<NData>) => NData;

    constructor(body: (args: Array<NData>) => NData) {
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Function Builtin"
    }

    apply(args: Array<NData>): NData {
        return this.body(args)
    }
}

