import * as ts from "typescript";

import { MethodParseResult } from "./MethodParseResult";
import { StatementParseResult } from "./StatementParseResult";

export class InterfaceParseResult extends StatementParseResult {
  public extendedInterfaces: string[];

  public methods: MethodParseResult[];

  public constructor(node: ts.InterfaceDeclaration, program: ts.Program) {
    super(node);

    this.methods = [];
    this.id = node.name.text;
    this.extendedInterfaces = [];

    node.members.forEach(x => {
      if (ts.isMethodSignature(x)) {
        this.methods.push(new MethodParseResult(x, program));
      }
    });

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
