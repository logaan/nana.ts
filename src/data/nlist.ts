import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";
import { Complete } from "../process/complete";
import { Running } from "../process/running";

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

class EvaluatingList implements Process {
    unevaluated: Array<NData>;
    evaluated: Array<NData>;
    evaluating: Process;
    environment: Environment;

    constructor(unevaluated: Array<NData>, evaluated: Array<NData>, evaluating: Process, environment: Environment) {
        this.unevaluated = unevaluated;
        this.evaluated = evaluated;
        this.evaluating = evaluating;
        this.environment = environment;
    }

    step(): Process {
        if (this.evaluating.isComplete()) {
            if (this.unevaluated.length == 0) {
                return new Complete(new NList(this.evaluated.concat(this.evaluating.result())));
            } else {
                const newEvaluating = new Running(this.unevaluated[0], this.environment);
                const newUnevaluated = this.unevaluated.slice(0);
                const newEvaluated = this.evaluated.concat(this.evaluating.result());
                return new EvaluatingList(newUnevaluated, newEvaluated, newEvaluating, this.environment);
            }
        } else {
            const newEvaluating = this.evaluating.step();
            return new EvaluatingList(this.unevaluated, this.evaluated, newEvaluating, this.environment);
        }
    }

    isComplete(): boolean {
        return false;
    }

    result(): NData {
        throw "None";
    }

}