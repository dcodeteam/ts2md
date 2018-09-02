import * as path from "path";

import * as ts from "typescript";

import { ExportElement, ExportParseResult } from "./parsers/ExportParseResult";
import { ImportElement } from "./parsers/ImportParseResult";
import { ModuleParseResult } from "./parsers/ModuleParseResult";
import { NodeParseResult } from "./parsers/NodeParseResult";
import { ProjectParseResult } from "./parsers/ProjectParseResult";

export interface ParseResult {
  readonly nodes: NodeParseResult[];
  readonly exported: ExportElement[];
}

export class Parser {
  private readonly root: string;

  private readonly entryFile: string;

  private readonly program: ts.Program;

  private readonly modules: Map<string, ModuleParseResult>;

  public constructor(root: string, entryFile: string, program: ts.Program) {
    this.root = root;
    this.program = program;
    this.entryFile = entryFile;
    this.modules = new Map();
  }

  private assureRelativePath(absoluteUrl: string): string {
    return !path.isAbsolute(absoluteUrl)
      ? absoluteUrl
      : path.relative(this.root, absoluteUrl);
  }

  private visit(filePath: string) {
    const file = this.program
      .getSourceFiles()
      .find(x => x.fileName.startsWith(filePath));

    if (!file) {
      throw new Error(`File ${filePath} not found.`);
    }

    const modulePath = this.assureRelativePath(filePath);

    if (this.modules.has(modulePath)) {
      return;
    }

    const result = new ModuleParseResult(
      modulePath,
      file.statements,
      this.program,
    );

    this.modules.set(modulePath, result);

    const visitDependency = (x: ImportElement | ExportParseResult) => {
      const importFilePath = path.join(path.dirname(filePath), x.modulePath);

      // eslint-disable-next-line no-param-reassign
      x.modulePath = this.assureRelativePath(importFilePath);

      this.visit(importFilePath);
    };

    result.imports.forEach(moduleImports => {
      moduleImports.imports.forEach(visitDependency);
    });

    result.reexports.forEach(visitDependency);
  }

  public parse(): ProjectParseResult {
    const modulePath = this.assureRelativePath(this.entryFile);

    this.visit(this.entryFile);

    return new ProjectParseResult(modulePath, this.modules);
  }
}
