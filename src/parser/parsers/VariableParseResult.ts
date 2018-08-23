import * as ts from "typescript";

import { StatementParseResult } from "./StatementParseResult";

export class VariableParseResult extends StatementParseResult {
  public type: string;

  public constructor(node: ts.VariableDeclaration, program: ts.Program) {
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
