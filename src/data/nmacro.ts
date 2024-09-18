import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";

export class NMacro implements NData {
    parameters: Array<String>
    body: Array<NData>

    constructor(parameters: Array<String>, body: Array<NData>) {
        this.parameters = parameters
        this.body = body;
    }

    evaluate(environment: Environment): Process {
        throw "I don't think there's any way to evaluate a Macro"
    }

    apply(args: Array<NData>): Process {
        throw "Macros have their own apply"
    }

    // TODO: This should be returning an expression to be later evaluated
    macroApply(closedOverEnvironment: Environment, args: Array<NData>): Process {
        var newEnvironment = new Map(closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        const results = this.body.map((expression) => expression.evaluate(newEnvironment))
        return results[results.length - 1];
    }
}

