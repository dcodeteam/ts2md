import * as ts from "typescript";

import { NodeParseResult } from "./NodeParseResult";

export class VariableParseResult extends NodeParseResult {
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
