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

export function runUntilComplete(...threads: Process[]): Value {
    var totalComplete = 0;

    while (totalComplete < threads.length) {
        totalComplete = 0;

        for (let i = 0; i < threads.length; i++) {
            const process = threads[i];

            if (!isComplete(process) && isRunning(process)) {
                threads[i] = process.step();
            } else {
                totalComplete = totalComplete + 1;
            }
        }
    }

    const firstThread = threads[0];
    if (isComplete(firstThread)) {
        return firstThread.result;
    } else {
        throw "This should never happen"
    }
}
