import { Complete } from "../../process/types";
import { Environment, Value } from "../types";

export class NString implements Value {
    value: String;

    constructor(value: String) {
        this.value = value;
    }

    evaluate(_environment: Environment) {
        return new Complete(this);
    }
}
