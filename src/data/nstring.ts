import { Environment } from "./environment";
import { NData } from "./ndata";

// Looks like `"foo"`
export class NString {
    value: String;

    constructor(value: String) {
        this.value = value;
    }

    evaluate(environment: Environment): NData {
        return this;
    }

    apply(args: Array<NData>): NData {
        throw "Can't apply Strings"
    }
}

