import { NData } from "../data/ndata";
import { Process } from "./process";

export class Complete implements Process {
    expression: NData;

    constructor(expression: NData) {
        this.expression = expression;
    }

    step(): Process {
        throw "Already complete";
    }

    isComplete(): boolean {
        return true;
    }

    result(): NData {
        return this.expression;
    }

}