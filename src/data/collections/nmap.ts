import { Complete, Process } from "../../process/types";
import { Environment, Value } from "../types";

export class NMap implements Value {
    contents: Map<Value, Value>;

    constructor(contents: Map<Value, Value>) {
        this.contents = contents;
    }

    // TODO: This should be broken down into steps for each key and value
    evaluate(environment: Environment): Process {
        const newMap = new Map();

        this.contents.forEach((value, key) =>
            newMap.set(
                key.evaluate(environment),
                value.evaluate(environment)))

        return new Complete(new NMap(newMap));
    }

    apply(args: Array<Value>): Process {
        if (args.length === 1) {
            const key = args[0]
            const value = this.contents.get(key)
            if (value) {
                return new Complete(value);
            } else {
                throw key + " not found in this map"
            }
        } else {
            throw "Maps can only be applied to a single value"
        }
    }
}

