import * as ts from "typescript";
import { NodeParseResult } from "./NodeParseResult";

export class InterfaceParseResult extends NodeParseResult {
  public extendedInterfaces: string[];

  public constructor(node: ts.InterfaceDeclaration) {
    super(node);

    this.id = node.name.text;
    this.extendedInterfaces = [];

    if (node.heritageClauses) {
      node.heritageClauses.forEach(heritageClause => {
        heritageClause.types.forEach(x => {
          const heritageName = ts.isIdentifier(x.expression)
            ? x.expression.text
            : null;

          if (heritageName) {
            if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
              this.extendedInterfaces.push(heritageName);
            }
          }
        });
      });
    }
  }
}
