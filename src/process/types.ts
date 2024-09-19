import { Value } from "../data/types"

export type Process = Running | Complete;

export interface Running {
    step(): Process
}

export class Complete {
    result: Value;

    constructor(result: Value) {
        this.result = result;
    }
}

export function isComplete(process: Process) {
    return "result" in process;
}