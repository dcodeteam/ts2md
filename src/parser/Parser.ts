import * as ts from "typescript";

import { ClassParseResult } from "./parsers/ClassParseResult";
import { FunctionParseResult } from "./parsers/FunctionParseResult";
import { InterfaceParseResult } from "./parsers/InterfaceParseResult";
import { NodeParseResult } from "./parsers/NodeParseResult";
import { VariableListParseResult } from "./parsers/VariableListParseResult";

export interface ParserResult {
  readonly nodes: NodeParseResult[];
}

export class Parser {
  private readonly fileName: string;

  private readonly program: ts.Program;

  public constructor(fileName: string, program: ts.Program) {
    this.program = program;
    this.fileName = fileName;
  }

  public parse(): ParserResult {
    const nodes: NodeParseResult[] = [];
    const file = this.program.getSourceFile(this.fileName);

    if (file) {
      file.statements.forEach(node => {
        if (ts.isClassDeclaration(node)) {
          nodes.push(new ClassParseResult(node, this.program));
        }

        if (ts.isInterfaceDeclaration(node)) {
          nodes.push(new InterfaceParseResult(node, this.program));
        }

        if (ts.isFunctionDeclaration(node)) {
          nodes.push(new FunctionParseResult(node, this.program));
        }

        if (ts.isVariableStatement(node)) {
          const result = new VariableListParseResult(node);

          result.declarations.forEach(x => {
            nodes.push(x);
          });
        }
      });
    }

    return { nodes };
  }
}
