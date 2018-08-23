import * as ts from "typescript";

import { MethodParseResult } from "./MethodParseResult";
import { PropertyParseResult } from "./PropertyParseResult";
import { StatementParseResult } from "./StatementParseResult";

export class InterfaceParseResult extends StatementParseResult {
  public extendedInterfaces: string[];

  public methods: MethodParseResult[];

  public properties: PropertyParseResult[];

  public constructor(node: ts.InterfaceDeclaration, program: ts.Program) {
    super(node);

    this.methods = [];
    this.properties = [];
    this.id = node.name.text;
    this.extendedInterfaces = [];

    node.members.forEach(x => {
      if (ts.isMethodSignature(x)) {
        this.methods.push(new MethodParseResult(x, program));
      }

      if (ts.isPropertySignature(x)) {
        this.properties.push(new PropertyParseResult(x, program));
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
