import * as ts from "typescript";

import { StatementParseResult } from "./StatementParseResult";

export class FunctionParseResult extends StatementParseResult {
  public constructor(node: ts.FunctionDeclaration) {
    super(node);

    if (node.name) {
      this.id = node.name.text;
    }
  }
}
