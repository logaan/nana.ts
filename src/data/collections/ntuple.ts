import { CompleteProcessThen } from "../../process/completeProcessThen";
import { startEvaluatingList } from "../../process/evalArrayThen";
import { Process } from "../../process/types";
import { Environment, isFunction, isMacro, Value } from "../types";

export class NTuple implements Value {
    contents: Array<Value>;

    constructor(contents: Array<Value>) {
        this.contents = contents;
    }

    evaluate(environment: Environment): Process {
        const expressionToRun = this.contents[0];

        if (expressionToRun) {
            return new CompleteProcessThen(expressionToRun.evaluate(environment), (valueToApply: Value) => {
                const argsForExpression = this.contents.slice(1);
                if (isMacro(valueToApply)) {
                    return valueToApply.macroApply(environment, argsForExpression);
                } else if (isFunction(valueToApply)) {
                    return startEvaluatingList(argsForExpression, environment, (evaluatedArgs) => {
                        return valueToApply.apply(evaluatedArgs)
                    })
                } else {
                    throw "This value can't be applied"
                }
            })
        } else {
            throw "Can't evaluate an empty tuple"
        }
    }
}
