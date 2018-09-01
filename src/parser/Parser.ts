import * as path from "path";

import * as ts from "typescript";

import { ClassParseResult } from "./parsers/ClassParseResult";
import { ExportElement, ExportParseResult } from "./parsers/ExportParseResult";
import { FunctionParseResult } from "./parsers/FunctionParseResult";
import { ImportParseResult } from "./parsers/ImportParseResult";
import { InterfaceParseResult } from "./parsers/InterfaceParseResult";
import { NodeParseResult } from "./parsers/NodeParseResult";
import { VariableListParseResult } from "./parsers/VariableListParseResult";

export interface ParseResult {
  readonly nodes: NodeParseResult[];
  readonly exported: ExportElement[];
}

export class Parser {
  private readonly fileName: string;

  private readonly program: ts.Program;

  private result?: ParseResult;

  public constructor(fileName: string, program: ts.Program) {
    this.program = program;
    this.fileName = fileName;
  }

  private getFile(filePath: string): ts.SourceFile {
    const file = this.program
      .getSourceFiles()
      .find(x => x.fileName.startsWith(filePath));

    if (!file) {
      throw new Error(`File ${filePath} not found.`);
    }

    return file;
  }

  private resolveDependency(
    fileName: string,
    dependency: string,
  ): ts.SourceFile {
    const basePath = path.join(path.dirname(fileName), dependency);

    return this.getFile(basePath);
  }

  private parseFile(file: ts.SourceFile): void {
    const { nodes, exported } = this.result!;

    file.statements.forEach(node => {
      if (ts.isImportDeclaration(node)) {
        nodes.push(new ImportParseResult(node));
      }

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
        const result = new VariableListParseResult(node, this.program);

        result.declarations.forEach(x => {
          nodes.push(x);
        });
      }

      if (ts.isExportDeclaration(node)) {
        const { elements, moduleSpecifier } = new ExportParseResult(node);

        if (this.fileName === file.fileName) {
          elements.forEach(dependency => {
            exported.push(dependency);
          });
        }

        this.parseFile(this.resolveDependency(file.fileName, moduleSpecifier));
      }
    });
  }

  public parse(): ParseResult {
    if (!this.result) {
      this.result = { exported: [], nodes: [] };

      this.parseFile(this.getFile(this.fileName));
    }

    return this.result;
  }
}
