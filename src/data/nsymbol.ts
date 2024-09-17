import { NData } from "./ndata";
import { Environment } from "./environment"
import { Process } from "../process/process";
import { Complete } from "../process/complete";

export class NSymbol implements NData {
    name: String;

    constructor(name: String) {
        this.name = name;
    }

    evaluate(environment: Environment): Process {
        const value = environment.get(this.name);

        if (value) {
            return new Complete(value);
        } else {
            throw "`" + this.name + "` could not be found in the current environment"
        }
    }

    apply(args: Array<NData>): Process {
        throw "Can't apply Symbols"
    }
}

