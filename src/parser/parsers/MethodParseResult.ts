import * as ts from "typescript";

import { NodeAccessibility, getNodeAccessibility } from "../utils/ParseUtils";
import { NodeParseResult } from "./NodeParseResult";
import { ParameterParseResult } from "./ParameterParseResult";

export class MethodParseResult extends NodeParseResult {
  public accessibility: NodeAccessibility;

  public parameters: ParameterParseResult[];

  public returnType: string;

  public constructor(
    node: ts.MethodSignature | ts.MethodDeclaration,
    program: ts.Program
  ) {
    super(node);

    this.parameters = [];
    this.returnType = "unknown";
    this.accessibility = getNodeAccessibility(node);

    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(node.name);

    if (symbol) {
      this.fulfillSymbolData(symbol, checker);
    }

    const signature = checker.getSignatureFromDeclaration(node);

    if (signature) {
      this.returnType = checker.typeToString(
        checker.getReturnTypeOfSignature(signature)
      );
    }

    node.parameters.forEach(x => {
      this.parameters.push(new ParameterParseResult(x, program));
    });
  }
}
