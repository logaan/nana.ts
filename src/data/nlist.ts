import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";
import { Complete } from "../process/complete";
import { Running } from "../process/running";
import { EvaluatingList } from "../process/evaluatingList"

// Looks like `[foo bar baz]`
export class NList implements NData {
    contents: Array<NData>;

    constructor(contents: Array<NData>) {
        this.contents = contents;
    }

    // TODO: Each of these needs to run until complete
    evaluate(environment: Environment): Process {
        if (this.contents.length == 0) {
            return new Complete(new NList([]));
        } else {
            const evaluating = new Running(this.contents[0], environment);
            const unevaluated = this.contents.slice(0);
            return new EvaluatingList(unevaluated, [], evaluating, environment);
        }
    }

    apply(args: Array<NData>): Process {
        throw "TODO: Allow lists to be applied to a number"
    }
}
