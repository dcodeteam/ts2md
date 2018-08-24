import * as ts from "typescript";

import { getSymbolType } from "../utils/ParseUtils";
import { MemberParseResult } from "./MemberParseResult";

export class PropertyParseResult extends MemberParseResult {
  public type: string;

  public constructor(
    node: ts.PropertySignature | ts.PropertyDeclaration,
    program: ts.Program
  ) {
    super(node);

    this.type = "unknown";

    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(node.name);

    if (symbol) {
      this.fulfillSymbolData(symbol, checker);

      this.type = getSymbolType(checker, symbol, node.type);
    }
  }
}
