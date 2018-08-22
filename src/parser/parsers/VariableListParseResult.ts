import * as ts from "typescript";

import { NodeParseResult } from "./NodeParseResult";
import { VariableParseResult } from "./VariableParseResult";

export class VariableListParseResult extends NodeParseResult {
  public declarations: VariableParseResult[];

  public constructor(node: ts.VariableStatement) {
    super(node);

    this.declarations = node.declarationList.declarations.map(x => {
      const result = new VariableParseResult(x);

      result.exported = this.exported;

      return result;
    });
  }
}
