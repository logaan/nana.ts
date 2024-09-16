import { NData } from "./ndata";
import { Environment } from "./environment"

export class NSymbol {
    name: String;

    constructor(name: String) {
        this.name = name;
    }

    evaluate(environment: Environment): NData {
        const value = environment.get(this.name);

        if (value) {
            return value;
        } else {
            throw "`" + this.name + "` could not be found in the current environment"
        }
    }

    apply(args: Array<NData>): NData {
        throw "Can't apply Symbols"
    }
}

