import * as ts from "typescript";

import { NodeParseResult } from "./NodeParseResult";

export class PropertyParseResult extends NodeParseResult {
  public type: string;

  public constructor(node: ts.PropertyDeclaration, program: ts.Program) {
    super(node);

    this.type = "unknown";

    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(node.name);

    if (symbol) {
      this.fulfillSymbolData(symbol, checker);

      this.type = checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
      );
    }
  }
}
