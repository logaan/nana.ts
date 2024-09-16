import { NSymbol } from "./nsymbol";
import { NString } from "./nstring";
import { NTuple } from "./ntuple";
import { NList } from "./nlist";
import { NMap } from "./nmap";
import { NMacro } from "./nmacro";
import { NMacroBuiltin } from "./nmacrobuiltin";
import { NFunction } from "./nfunction";
import { NFunctionBuiltin } from "./nfunctionbuiltin";

export type NData =
    | NSymbol
    | NString
    | NTuple
    | NList
    | NMap
    | NMacro
    | NMacroBuiltin
    | NFunction
    | NFunctionBuiltin;
