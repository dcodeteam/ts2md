import * as ts from "typescript";

import { getSymbolType } from "../utils/ParseUtils";
import { NodeParseResult } from "./NodeParseResult";

export class ParameterParseResult extends NodeParseResult {
  public type: string;

  public constructor(node: ts.ParameterDeclaration, program: ts.Program) {
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
