import * as ts from "typescript";
import { NodeParseResult } from "./NodeParseResult";

export class FunctionParseResult extends NodeParseResult {
  public constructor(node: ts.FunctionDeclaration) {
    super(node);

    if (node.name) {
      this.id = node.name.text;
    }
  }
}
