import { NData } from "./ndata";
import { Environment } from "./environment"

export class NMacro {
    parameters: Array<String>
    body: Array<NData>

    constructor(parameters: Array<String>, body: Array<NData>) {
        this.parameters = parameters
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Macro"
    }

    apply(args: Array<NData>): NData {
        throw "Macros have their own apply"
    }

    macroApply(closedOverEnvironment: Environment, args: Array<NData>): NData {
        var newEnvironment = new Map(closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        const results = this.body.map((expression) => expression.evaluate(newEnvironment))
        return results[results.length - 1];
    }
}

