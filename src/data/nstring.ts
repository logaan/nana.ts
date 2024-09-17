import { Environment } from "./environment";
import { NData } from "./ndata";
import { Complete } from "../process/complete";
import { Process } from "../process/process";

// Looks like `"foo"`
export class NString implements NData {
    value: String;

    constructor(value: String) {
        this.value = value;
    }

    evaluate(environment: Environment): Process {
        return new Complete(this);
    }

    apply(args: Array<NData>): Process {
        throw "Can't apply Strings"
    }
}

