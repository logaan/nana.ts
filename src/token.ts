export function tokenise(input: String) {
    const spreadWrappers = input.replace(/([\(\)\[\]\{\}"'])/g, ' $1 ').trim();
    return spreadWrappers.split(/\s+/);
}