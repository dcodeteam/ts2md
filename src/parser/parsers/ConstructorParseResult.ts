import * as ts from "typescript";

import { NodeAccessibility, getNodeAccessibility } from "../utils/ParseUtils";
import { NodeParseResult } from "./NodeParseResult";

export class ConstructorParseResult extends NodeParseResult {
  public accessibility: NodeAccessibility;

  public constructor(node: ts.ConstructorDeclaration, program: ts.Program) {
    super(node);

    this.id = "constructor";
    this.accessibility = getNodeAccessibility(node);

    const checker = program.getTypeChecker();
    const signature = checker.getSignatureFromDeclaration(node);

    if (signature) {
      this.fulfillSignatureData(signature, checker);
    }
  }
}
