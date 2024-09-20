import { tcoEvaluateList } from "../../process/evalArrayThen";
import { Complete } from "../../process/types";
import { Value, Function, Environment } from "../types";

export class NFunction implements Function, Value {
    closedOverEnvironment: Environment;
    parameters: Array<String>;
    body: Array<Value>

    constructor(environment: Environment, parameters: Array<String>, body: Array<Value>) {
        this.closedOverEnvironment = environment;
        this.parameters = parameters;
        this.body = body;
    }

    evaluate(_environment: Environment) {
        return new Complete(this);
    }

    apply(args: Array<Value>) {
        var newEnvironment = new Map(this.closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        return tcoEvaluateList(this.body, newEnvironment);
    }
}
