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

export function isRunning(process: Process) {
    return "step" in process;
}

export function runUntilComplete(process: Process): Value {
    while (!isComplete(process) && isRunning(process)) {
        process = process.step();
    }

    return process.result;
}