import { Value } from "../data/types";
import { isComplete, Process, Running } from "./types";

export class CompleteProcessThen implements Running {
    process: Process;
    then: (done: Value) => Process

    constructor(process: Process, then: (done: Value) => Process) {
        this.process = process;
        this.then = then;
    }

    step(): Process {
        if (isComplete(this.process)) {
            return this.then(this.process.result)
        } else {
            return new CompleteProcessThen(this.process.step(), this.then);
        }
    }
}
