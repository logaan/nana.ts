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
        // If we're going to run a macro then don't eval the arguments, otherwise do
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

    apply(args: Array<Value>): Process {
        throw "TODO: Tupple apply"
    }
}
