import * as ts from "typescript";

import { NodeAccessibility, getNodeAccessibility } from "../utils/ParseUtils";
import { NodeParseResult } from "./NodeParseResult";

export class MemberParseResult extends NodeParseResult {
  public accessibility: NodeAccessibility;

  public constructor(
    node:
      | ts.PropertySignature
      | ts.PropertyDeclaration
      | ts.SignatureDeclarationBase
  ) {
    super(node);

    this.accessibility = getNodeAccessibility(node);
  }
}
