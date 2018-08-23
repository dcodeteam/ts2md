import * as ts from "typescript";

import { NodeAccessibility, getNodeAccessibility } from "../utils/ParseUtils";
import { NodeParseResult } from "./NodeParseResult";
import { ParameterParseResult } from "./ParameterParseResult";

export class ConstructorParseResult extends NodeParseResult {
  public accessibility: NodeAccessibility;

  public parameters: ParameterParseResult[];

  public constructor(
    node: ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration,
    program: ts.Program
  ) {
    super(node);

    this.id = "constructor";
    this.parameters = [];
    this.accessibility = getNodeAccessibility(node);

    const checker = program.getTypeChecker();
    const signature = checker.getSignatureFromDeclaration(node);

    if (signature) {
      this.fulfillSignatureData(signature, checker);
    }

    node.parameters.forEach(x => {
      this.parameters.push(new ParameterParseResult(x, program));
    });
  }
}
