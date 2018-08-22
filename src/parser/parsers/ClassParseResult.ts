import * as ts from "typescript";

import { NodeParseResult } from "./NodeParseResult";

export class ClassParseResult extends NodeParseResult {
  public extendedClass: null | string;

  public implementedInterfaces: string[];

  public constructor(node: ts.ClassDeclaration) {
    super(node);

    if (node.name) {
      this.id = node.name.text;
    }

    this.extendedClass = null;
    this.implementedInterfaces = [];

    if (node.heritageClauses) {
      node.heritageClauses.forEach(heritageClause => {
        heritageClause.types.forEach(x => {
          const heritageName = ts.isIdentifier(x.expression)
            ? x.expression.text
            : null;

          if (heritageName) {
            if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
              this.extendedClass = heritageName;
            }

            if (heritageClause.token === ts.SyntaxKind.ImplementsKeyword) {
              this.implementedInterfaces.push(heritageName);
            }
          }
        });
      });
    }
  }
}
