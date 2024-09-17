export namespace WasiIoPoll {
  export { Pollable };
  export function poll(in_: Array<Pollable>): Uint32Array;
}

export class Pollable {
  block(): void;
}
