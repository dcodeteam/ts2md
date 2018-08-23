import * as ts from "typescript";

import { ParameterParseResult } from "./ParameterParseResult";
import { StatementParseResult } from "./StatementParseResult";

export class FunctionParseResult extends StatementParseResult {
  public parameters: ParameterParseResult[];

  public returnType: string;

  public constructor(node: ts.FunctionDeclaration, program: ts.Program) {
    super(node);

    this.parameters = [];
    this.returnType = "unknown";

    const checker = program.getTypeChecker();

    if (node.name) {
      const symbol = checker.getSymbolAtLocation(node.name);

      if (symbol) {
        this.fulfillSymbolData(symbol, checker);
      }

      this.id = node.name.text;
    }

    const signature = checker.getSignatureFromDeclaration(node);

    if (signature) {
      this.fulfillSignatureData(signature, checker);

      this.returnType = checker.typeToString(signature.getReturnType());
    }

    node.parameters.forEach(x => {
      this.parameters.push(new ParameterParseResult(x, program));
    });
  }
}
