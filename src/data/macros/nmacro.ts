import { completeWithLast, startEvaluatingList } from "../../process/evalArrayThen";
import { Complete, Process } from "../../process/types";
import { Environment, Macro, Value } from "../types";

export class NMacro implements Value, Macro {
    parameters: Array<String>
    body: Array<Value>

    constructor(parameters: Array<String>, body: Array<Value>) {
        this.parameters = parameters
        this.body = body;
    }

    evaluate(_environment: Environment) {
        return new Complete(this);
    }

    // TODO: This should be returning an expression to be later evaluated
    macroApply(closedOverEnvironment: Environment, args: Array<Value>): Process {
        var newEnvironment = new Map(closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        return startEvaluatingList(this.body, newEnvironment, completeWithLast)
    }
}
