import * as path from "path";

import * as ts from "typescript";

import { ExportElement } from "./parsers/ExportParseResult";
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

  private makeRelativeUrl(absoluteUrl: string): string {
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

    const modulePath = this.makeRelativeUrl(filePath);

    if (this.modules.has(modulePath)) {
      return;
    }

    const result = new ModuleParseResult(
      modulePath,
      file.statements,
      this.program,
    );

    this.modules.set(modulePath, result);

    result.imports.forEach(moduleImports => {
      moduleImports.imports.forEach(x => {
        this.visit(path.join(path.dirname(filePath), x.modulePath));
      });
    });
  }

  public parse(): ProjectParseResult {
    this.visit(this.entryFile);

    return new ProjectParseResult(this.modules);
  }
}
