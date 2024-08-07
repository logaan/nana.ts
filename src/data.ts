// Looks like `foo`
export class NSymbol {
    name: String;

    constructor(name: String) {
        this.name = name;
    }
}

// Looks like `"foo"`
export class NString {
    value: String;

    constructor(value: String) {
        this.value = value;
    }
}

// Looks like `(foo bar baz)`
export class NTuple {
    contents: Array<NData>;

    constructor(contents: Array<NData>) {
        this.contents = contents;
    }
}

// Looks like `[foo bar baz]`
export class NList {
    contents: Array<NData>;

    constructor(contents: Array<NData>) {
        this.contents = contents;
    }
}

// Looks like `{foo 1 "bar" 2}`
export class NMap {
    contents: Map<NData, NData>;

    constructor(contents: Map<NData, NData>) {
        this.contents = contents;
    }
}

export type NData =
    | NSymbol
    | NString
    | NTuple
    | NList
    | NMap;
