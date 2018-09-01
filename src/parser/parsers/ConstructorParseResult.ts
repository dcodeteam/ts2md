import * as ts from "typescript";

import { MemberParseResult } from "./MemberParseResult";
import { ParameterParseResult } from "./ParameterParseResult";

export class ConstructorParseResult extends MemberParseResult {
  public parameters: ParameterParseResult[];

  public constructor(
    node: ts.ConstructorDeclaration | ts.ConstructSignatureDeclaration,
    program: ts.Program,
  ) {
    super(node);

    this.id = "constructor";
    this.parameters = [];

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
