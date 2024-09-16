import { NData } from "./ndata";
import { Environment } from "./environment"

// Looks like `{foo 1 "bar" 2}`
export class NMap {
    contents: Map<NData, NData>;

    constructor(contents: Map<NData, NData>) {
        this.contents = contents;
    }

    evaluate(environment: Environment): NData {
        const newMap = new Map();

        this.contents.forEach((value, key) =>
            newMap.set(
                key.evaluate(environment),
                value.evaluate(environment)))

        return new NMap(newMap);
    }

    apply(args: Array<NData>): NData {
        if (args.length === 1) {
            const key = args[0]
            const value = this.contents.get(key)
            if (value) {
                return value;
            } else {
                throw key + " not found in this map"
            }
        } else {
            throw "Maps can only be applied to a single value"
        }
    }
}

