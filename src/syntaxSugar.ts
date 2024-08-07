export function wrapFileInParens(fileContents: String) {
    return "(" + fileContents.trim() + ")";
}

export function moveFnCallParensToTheLeft(fileContents: String) {
    return fileContents.replace(/([^()\s]+)\(/g, '($1 ')
}

export function desugarFile(fileContents: String) {
    return wrapFileInParens(
        moveFnCallParensToTheLeft(
            fileContents))
}
