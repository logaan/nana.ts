import { Environment } from "../data/environment";
import { NData } from "../data/ndata";
import { Process } from "./process";

export class Running implements Process {
    expression: NData;
    environment: Environment;

    constructor(expression: NData, environment: Environment) {
        this.expression = expression;
        this.environment = environment;
    }

    step() {
        return this.expression.evaluate(this.environment);
    }

    isComplete(): boolean {
        return false;
    }

    result(): NData {
        throw "None";
    }
}
