import { Process } from "../process/types";

export type Environment = Map<String, Value>;

export interface Value {
    evaluate(environment: Environment): Process
}

export interface Function {
    apply(args: Array<Value>): Process
}

export interface Macro {
    macroApply(environment: Environment, args: Array<Value>): Process
}

export function isExpression(data: Value) {
    return "evaluate" in data;
}

export function isFunction(data: Value) {
    return "apply" in data;
}

export function isMacro(data: Value) {
    return "macroApply" in data;
}
