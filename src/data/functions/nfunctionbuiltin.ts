import { Environment, Function, Value } from "../types";
import { Complete } from "../../process/types";

export class NFunctionBuiltin implements Function, Value {
    body: (args: Array<Value>) => Value;

    constructor(body: (args: Array<Value>) => Value) {
        this.body = body;
    }

    evaluate(_environment: Environment) {
        return new Complete(this);
    }

    apply(args: Array<Value>) {
        return new Complete(this.body(args))
    }
}
