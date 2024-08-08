// TODO: Break each of these up into their own file
// Looks like `foo`
type Environment = Map<String, NData>;

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

// Looks like `(foo bar baz)`
export class NTuple {
    contents: Array<NData>;

    constructor(contents: Array<NData>) {
        this.contents = contents;
    }

    evaluate(environment: Environment): NData {
        // If we're going to run a macro then don't eval the arguments, otherwise do
        const expressionToRun = this.contents[0];
        const argsForExpression = this.contents.slice(1);

        if (expressionToRun) {
            const dataToRun = expressionToRun.evaluate(environment)
            if (dataToRun instanceof NMacro ||
                dataToRun instanceof NMacroBuiltin) {
                return dataToRun.macroApply(environment, argsForExpression);
            } else {
                const evaluatedArgs = argsForExpression.map((value) =>
                    value.evaluate(environment))
                return dataToRun.apply(evaluatedArgs)
            }
        } else {
            throw "Can't evaluate an empty tuple"
        }
    }

    apply(args: Array<NData>): NData {
        throw "TODO: Tupple apply"
    }
}

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

export class NMacro {
    parameters: Array<String>
    body: Array<NData>

    constructor(parameters: Array<String>, body: Array<NData>) {
        this.parameters = parameters
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Macro"
    }

    apply(args: Array<NData>): NData {
        throw "Macros have their own apply"
    }

    macroApply(closedOverEnvironment: Environment, args: Array<NData>): NData {
        var newEnvironment = new Map(closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        const results = this.body.map((expression) => expression.evaluate(newEnvironment))
        return results[results.length - 1];
    }
}

export class NMacroBuiltin {
    body: (environment: Environment, args: Array<NData>) => NData;

    constructor(body: (environment: Environment, args: Array<NData>) => NData) {
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Macro Builtin"
    }

    apply(args: Array<NData>): NData {
        throw "Macros have their own apply"
    }

    macroApply(environment: Environment, args: Array<NData>): NData {
        return this.body(environment, args);
    }
}

export class NFunction {
    closedOverEnvironment: Environment;
    parameters: Array<String>;
    body: Array<NData>

    constructor(environment: Environment, parameters: Array<String>, body: Array<NData>) {
        this.closedOverEnvironment = environment;
        this.parameters = parameters;
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Function"
    }

    apply(args: Array<NData>): NData {
        var newEnvironment = new Map(this.closedOverEnvironment);
        this.parameters.forEach((param, index) => newEnvironment.set(param, args[index]));

        const results = this.body.map((expression) => expression.evaluate(newEnvironment))
        return results[results.length - 1];
    }
}

export class NFunctionBuiltin {
    body: (args: Array<NData>) => NData;

    constructor(body: (args: Array<NData>) => NData) {
        this.body = body;
    }

    evaluate(environment: Environment): NData {
        throw "I don't think there's any way to evaluate a Function Builtin"
    }

    apply(args: Array<NData>): NData {
        return this.body(args)
    }
}


export type NData =
    | NSymbol
    | NString
    | NTuple
    | NList
    | NMap
    | NMacro
    | NMacroBuiltin
    | NFunction
    | NFunctionBuiltin;
