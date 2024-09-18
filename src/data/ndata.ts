import { Environment } from "./environment";
import { Process } from "../process/process";

// TODO: NData should probably be a union of things you can eval, things you can
// apply, and things you can macro apply. There should be no data that
// implements an interface method with a straight up throw.
export interface NData {
    evaluate(environment: Environment): Process
    apply(args: Array<NData>): Process
}
