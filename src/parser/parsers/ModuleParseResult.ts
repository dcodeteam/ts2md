import * as ts from "typescript";

import { ClassParseResult } from "./ClassParseResult";
import { EnumParseResult } from "./EnumParseResult";
import { ExportParseResult } from "./ExportParseResult";
import { FunctionParseResult } from "./FunctionParseResult";
import { ImportParseResult } from "./ImportParseResult";
import { InterfaceParseResult } from "./InterfaceParseResult";
import { NodeParseResult } from "./NodeParseResult";
import { TypeParseResult } from "./TypeParseResult";
import { VariableListParseResult } from "./VariableListParseResult";

export class ModuleParseResult {
  public modulePath: string;

  public nodes: NodeParseResult[];

  public imports: ImportParseResult[];

  public reexports: ExportParseResult[];

  public constructor(
    modulePath: string,
    statements: ts.NodeArray<ts.Statement>,
    program: ts.Program,
  ) {
    this.nodes = [];
    this.imports = [];
    this.reexports = [];

    this.modulePath = modulePath;

    statements.forEach(node => {
      if (ts.isClassDeclaration(node)) {
        this.nodes.push(new ClassParseResult(node, program));
      }

      if (ts.isInterfaceDeclaration(node)) {
        this.nodes.push(new InterfaceParseResult(node, program));
      }

      if (ts.isEnumDeclaration(node)) {
        this.nodes.push(new EnumParseResult(node, program));
      }

      if (ts.isFunctionDeclaration(node)) {
        this.nodes.push(new FunctionParseResult(node, program));
      }

      if (ts.isVariableStatement(node)) {
        const result = new VariableListParseResult(node, program);

        result.declarations.forEach(x => {
          this.nodes.push(x);
        });
      }

      if (ts.isTypeAliasDeclaration(node)) {
        this.nodes.push(new TypeParseResult(node, program));
      }

      if (ts.isImportDeclaration(node)) {
        this.imports.push(new ImportParseResult(node));
      }

      if (ts.isExportDeclaration(node)) {
        this.reexports.push(new ExportParseResult(node));
      }
    });
  }
}
