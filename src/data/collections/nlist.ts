import { Value, Environment } from "../types";
import { Process, Complete } from "../../process/types";
import { startEvaluatingList as startEvaluatingArray } from "../../process/evalArray"

export class NList implements Value {
    contents: Array<Value>;

    constructor(contents: Array<Value>) {
        this.contents = contents;
    }

    evaluate(environment: Environment): Process {
        return startEvaluatingArray(this.contents, environment, this.wrap);
    }

    private wrap(done: Value[]) {
        return new Complete(new NList(done))
    }
}