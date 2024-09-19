import { Process } from "../../process/types";
import { NMacro } from "../macros/nmacro";
import { NMacroBuiltin } from "../macros/nmacrobuiltin";
import { Environment, Value } from "../types";

export class NTuple implements Value {
    contents: Array<Value>;

    constructor(contents: Array<Value>) {
        this.contents = contents;
    }

    evaluate(environment: Environment): Process {
        const expressionToRun = this.contents[0];
        const argsForExpression = this.contents.slice(1);

        if (expressionToRun) {
            const dataToRun = expressionToRun.evaluate(environment)
            if (dataToRun instanceof NMacro ||
                dataToRun instanceof NMacroBuiltin) {
                return dataToRun.macroApply(environment, argsForExpression);
            } else {
                const evaluatedArgs = argsForExpression.map((value) =>
                    value.evaluate(environment))
                return dataToRun.apply(evaluatedArgs)
            }
        } else {
            throw "Can't evaluate an empty tuple"
        }
    }
}
