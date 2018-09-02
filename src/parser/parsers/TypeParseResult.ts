import * as ts from "typescript";

import { getSymbolType } from "../utils/ParseUtils";
import { StatementParseResult } from "./StatementParseResult";

export class TypeParseResult extends StatementParseResult {
  public type: string;

  public constructor(node: ts.TypeAliasDeclaration, program: ts.Program) {
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
