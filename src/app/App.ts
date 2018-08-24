import * as ts from "typescript";

import { ParseResult, Parser } from "../parser/Parser";
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
  private readonly entryFile: string;

  private readonly program: ts.Program;

  /**
   * @param entryFile Absolute path to documentation entry file.
   * @param program TypeScript program.
   */
  public constructor(entryFile: string, program: ts.Program) {
    this.program = program;
    this.entryFile = entryFile;
  }

  /**
   * Creates parse result.
   */
  protected parse(): ParseResult {
    const parser = new Parser(this.entryFile, this.program);

    return parser.parse();
  }

  /**
   * Generates markdown form provided `parseResult`.
   *
   * @param parseResult Plain object representation of parsed files.
   */
  protected render(parseResult: ParseResult): string {
    const renderer = new Renderer(parseResult);

    return renderer.render();
  }

  /**
   * Generates markdown for `entryFile`.
   */
  public generateDocs(): string {
    return this.render(this.parse());
  }
}
