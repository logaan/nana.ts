import { Complete } from "../../process/types";
import { Environment, Value } from "../types";

export class NSymbol implements Value {
    name: String;

    constructor(name: String) {
        this.name = name;
    }

    evaluate(environment: Environment) {
        const value = environment.get(this.name);

        if (value !== undefined) {
            return new Complete(value);
        } else {
            throw "`" + this.name + "` could not be found in the current environment"
        }
    }
}
