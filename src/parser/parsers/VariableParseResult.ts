import * as ts from "typescript";

import { StatementParseResult } from "./StatementParseResult";

export class VariableParseResult extends StatementParseResult {
  public type: null | "number" | "string";

  public constructor(node: ts.VariableDeclaration) {
    super(node);

    if (ts.isIdentifier(node.name)) {
      this.id = node.name.text;
    }

    this.type = null;

    if (
      (node.initializer && ts.isNumericLiteral(node.initializer)) ||
      (node.type && node.type.kind === ts.SyntaxKind.NumberKeyword)
    ) {
      this.type = "number";
    }

    if (
      (node.initializer && ts.isStringLiteral(node.initializer)) ||
      (node.type && node.type.kind === ts.SyntaxKind.StringKeyword)
    ) {
      this.type = "string";
    }
  }
}
