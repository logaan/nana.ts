import { Process } from "../process/types";

export type Environment = Map<String, Value>;

export type NData = Value | Function | Macro;

export interface Value {
    evaluate(environment: Environment): Process
}

export interface Function {
    apply(args: Array<Value>): Process
}

export interface Macro {
    macroApply(environment: Environment, args: Array<Value>): Process
}

export function isValue(data: NData) {
    return "evaluate" in data;
}

export function isFunction(data: NData) {
    return "apply" in data;
}

export function isMacro(data: NData) {
    return "macroApply" in data;
}
