import * as ts from "typescript";

import { NodeParseResult } from "./NodeParseResult";

export class EnumMemberParseResult extends NodeParseResult {
  public value?: number | string;

  public constructor(node: ts.EnumMember, program: ts.Program) {
    super(node);

    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(node.name);

    if (symbol) {
      this.fulfillSymbolData(symbol, checker);
    }

    if (node.initializer) {
      if (ts.isNumericLiteral(node.initializer)) {
        this.value = node.initializer.text;
      }

      if (ts.isStringLiteral(node.initializer)) {
        this.value = node.initializer.text;
      }
    }
  }
}
