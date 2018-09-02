import * as ts from "typescript";

import { Parser } from "../parser/Parser";
import { ProjectParseResult } from "../parser/parsers/ProjectParseResult";
import { Renderer } from "../renderer/Renderer";

/**
 * API for NodeJS.
 *
 * ```javascript
 * const { App } = require('ts2md');
 *
 * module.exports = function generateDocs(entryFile, program) {
 *   const app = new App(entryFile, program);
 *
 *   return app.generateDocs();
 * }
 * ```
 */
export class App {
  private readonly root: string;

  private readonly entryFile: string;

  private readonly program: ts.Program;

  /**
   * @param root Absolute path to project root directory.
   * @param entryFile Absolute path to project entry file.
   * @param program TypeScript program.
   */
  public constructor(root: string, entryFile: string, program: ts.Program) {
    this.root = root;
    this.program = program;
    this.entryFile = entryFile;
  }

  /**
   * Creates parse result.
   */
  protected parse(): ProjectParseResult {
    return new Parser(this.root, this.entryFile, this.program).parse();
  }

  /**
   * Generates markdown form provided `parseResult`.
   *
   * @param parseResult Plain object representation of parsed files.
   */
  protected render(parseResult: ProjectParseResult): string {
    return new Renderer(parseResult).render();
  }

  /**
   * Generates markdown for `entryFile`.
   */
  public generateDocs(): string {
    return this.render(this.parse());
  }
}
