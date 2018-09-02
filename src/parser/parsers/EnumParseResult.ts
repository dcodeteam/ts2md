import * as ts from "typescript";

import { EnumMemberParseResult } from "./EnumMemberParseResult";
import { StatementParseResult } from "./StatementParseResult";

export class EnumParseResult extends StatementParseResult {
  public members: EnumMemberParseResult[];

  public constructor(node: ts.EnumDeclaration, program: ts.Program) {
    super(node);

    this.id = node.name.text;
    this.members = [];

    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(node.name);

    if (symbol) {
      this.fulfillSymbolData(symbol, checker);
    }

    node.members.forEach(member => {
      this.members.push(new EnumMemberParseResult(member, program));
    });
  }
}
