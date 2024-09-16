import { NData } from "./ndata";
import { Environment } from "./environment"
import { NMacro } from "./nmacro";
import { NMacroBuiltin } from "./nmacrobuiltin";

// Looks like `(foo bar baz)`
export class NTuple {
    contents: Array<NData>;

    constructor(contents: Array<NData>) {
        this.contents = contents;
    }

    evaluate(environment: Environment): NData {
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

    apply(args: Array<NData>): NData {
        throw "TODO: Tupple apply"
    }
}
