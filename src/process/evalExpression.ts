import { Value, Environment } from "../data/types";
import { Running } from "./types";

export class EvalExpression implements Running {
    expression: Value;
    environment: Environment;

    constructor(expression: Value, environment: Environment) {
        this.expression = expression;
        this.environment = environment;
    }

    step() {
        return this.expression.evaluate(this.environment);
    }
}
