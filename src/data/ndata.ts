import { Environment } from "./environment";
import { Process } from "../process/process";

export interface NData {
    evaluate(environment: Environment): Process
    apply(args: Array<NData>): Process
}
