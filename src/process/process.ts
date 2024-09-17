// TODO: I think there's a smarter way to do this with union types.
// Either a process is a RunningProcess in which case it implements step()

import { NData } from "../data/ndata"

// or it's a complete process, in which case it has a result.
export interface Process {
    step(): Process
    isComplete(): boolean
    result(): NData
}
