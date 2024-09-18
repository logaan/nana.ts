import { Environment } from "../data/environment";
import { NData } from "../data/ndata";
import { NList } from "../data/nlist";
import { Complete } from "./complete";
import { Process } from "./process";
import { Running } from "./running";

export class EvaluatingList implements Process {
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
