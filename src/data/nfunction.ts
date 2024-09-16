import { NData } from "./ndata";
import { Environment } from "./environment"

export class NFunction {
    closedOverEnvironment: Environment;
    parameters: Array<String>;
    body: Array<NData>

    constructor(environment: Environment, parameters: Array<String>, body: Array<NData>) {
        this.closedOverEnvironment = environment;
        this.parameters = parameters;
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Function"
    }

    apply(args: Array<NData>): NData {
        var newEnvironment = new Map(this.closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        const results = this.body.map((expression) => expression.evaluate(newEnvironment))
        return results[results.length - 1];
    }
}

