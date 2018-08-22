import * as ts from "typescript";
import { ClassParseResult } from "./parsers/ClassParseResult";
import { NodeParseResult } from "./parsers/NodeParseResult";
import { InterfaceParseResult } from "./parsers/InterfaceParseResult";
import { VariableListParseResult } from "./parsers/VariableListParseResult";
import { FunctionParseResult } from "./parsers/FunctionParseResult";

export interface ParserResult {
  readonly nodes: Map<string, NodeParseResult>;
}

export class Parser {
  private readonly file: ts.SourceFile;

  public constructor(fileName: string, sourceText: string) {
    this.file = ts.createSourceFile(
      fileName,
      sourceText,
      ts.ScriptTarget.ESNext,
      true
    );
  }

  public parse(): ParserResult {
    const nodes = new Map<string, NodeParseResult>();

    this.file.statements.forEach(node => {
      if (ts.isClassDeclaration(node)) {
        const result = new ClassParseResult(node);

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

    return { nodes };
  }
}
