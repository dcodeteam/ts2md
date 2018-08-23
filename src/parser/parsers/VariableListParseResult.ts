import * as ts from "typescript";

import { StatementParseResult } from "./StatementParseResult";
import { VariableParseResult } from "./VariableParseResult";

export class VariableListParseResult extends StatementParseResult {
  public declarations: VariableParseResult[];

  public constructor(node: ts.VariableStatement, program: ts.Program) {
    // @ts-ignore
    super(node);

    this.declarations = node.declarationList.declarations.map(x => {
      const result = new VariableParseResult(x, program);

      result.exported = this.exported;

      return result;
    });
  }
}
