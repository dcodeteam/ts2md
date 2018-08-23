import * as ts from "typescript";

import { ClassParseResult } from "./parsers/ClassParseResult";
import { FunctionParseResult } from "./parsers/FunctionParseResult";
import { InterfaceParseResult } from "./parsers/InterfaceParseResult";
import { NodeParseResult } from "./parsers/NodeParseResult";
import { VariableListParseResult } from "./parsers/VariableListParseResult";

export interface ParserResult {
  readonly nodes: Map<string, NodeParseResult>;
}

export class Parser {
  private readonly fileName: string;

  private readonly program: ts.Program;

  public constructor(fileName: string, program?: ts.Program) {
    this.fileName = fileName;
    this.program =
      program ||
      ts.createProgram([fileName], {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext
      });
  }

  public parse(): ParserResult {
    const nodes = new Map<string, NodeParseResult>();
    const file = this.program.getSourceFile(this.fileName);

    if (file) {
      file.statements.forEach(node => {
        if (ts.isClassDeclaration(node)) {
          const result = new ClassParseResult(node, this.program);

          nodes.set(result.id, result);
        }

        if (ts.isInterfaceDeclaration(node)) {
          const result = new InterfaceParseResult(node);

          nodes.set(result.id, result);
        }

        if (ts.isFunctionDeclaration(node)) {
          const result = new FunctionParseResult(node);

          nodes.set(result.id, result);
        }

        if (ts.isVariableStatement(node)) {
          const result = new VariableListParseResult(node);

          result.declarations.forEach(x => {
            nodes.set(x.id, x);
          });
        }
      });
    }

    return { nodes };
  }
}
