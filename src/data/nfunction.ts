import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";

export class NFunction implements NData {
    closedOverEnvironment: Environment;
    parameters: Array<String>;
    body: Array<NData>

    constructor(environment: Environment, parameters: Array<String>, body: Array<NData>) {
        this.closedOverEnvironment = environment;
        this.parameters = parameters;
        this.body = body;
    }

    evaluate(environment: Environment): Process {
        throw "I don't think there's any way to evaluate a Function"
    }

    // TODO: This should have a step for each expression in the body
    apply(args: Array<NData>): Process {
        var newEnvironment = new Map(this.closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        const results = this.body.map((expression) => expression.evaluate(newEnvironment))
        return results[results.length - 1];
    }
}

