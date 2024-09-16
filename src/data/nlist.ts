import { NData } from "./ndata";
import { Environment } from "./environment"

// Looks like `[foo bar baz]`
export class NList {
    contents: Array<NData>;

    constructor(contents: Array<NData>) {
        this.contents = contents;
    }

    evaluate(environment: Environment): NData {
        return new NList(this.contents.map((value) =>
            value.evaluate(environment))
        )
    }

    apply(args: Array<NData>): NData {
        throw "TODO: Allow lists to be applied to a number"
    }
}

