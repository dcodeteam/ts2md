import * as ts from "typescript";

import { ConstructorParseResult } from "./ConstructorParseResult";
import { MethodParseResult } from "./MethodParseResult";
import { PropertyParseResult } from "./PropertyParseResult";
import { StatementParseResult } from "./StatementParseResult";

export class ClassParseResult extends StatementParseResult {
  public extendedClass: null | string;

  public implementedInterfaces: string[];

  public constructors: ConstructorParseResult[];

  public methods: MethodParseResult[];

  public properties: PropertyParseResult[];

  public constructor(node: ts.ClassDeclaration, program: ts.Program) {
    super(node);

    const checker = program.getTypeChecker();

    this.extendedClass = null;
    this.implementedInterfaces = [];

    this.methods = [];
    this.properties = [];
    this.constructors = [];

    if (node.name) {
      const symbol = checker.getSymbolAtLocation(node.name);

      if (symbol) {
        this.fulfillSymbolData(symbol, checker);
      }

      this.id = node.name.text;
    }

    node.members.forEach(x => {
      if (ts.isMethodDeclaration(x)) {
        this.methods.push(new MethodParseResult(x, program));
      }

      if (ts.isConstructorDeclaration(x)) {
        this.constructors.push(new ConstructorParseResult(x, program));
      }

      if (ts.isPropertyDeclaration(x)) {
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
