import * as fs from "fs";
import * as path from "path";

import * as commander from "commander";
import * as ts from "typescript";

import { App } from "../app/App";
import { Glob } from "../glob/Glob";

/**
 * By default it will output files to `docs.md` file relative to `cwd`.
 *
 * ```bash
 * ts2md --root src --entry src/index.ts
 * ```
 *
 * Pass `--out` parameter to define set custom path.
 *
 * ```bash
 * ts2md --root src --entry src/index.ts --out docs/README.md
 * ```
 */
export class Cli {
  private readonly cwd: string;

  private readonly argv: string[];

  /**
   * @param cwd Command working directory.
   * @param version Current program version.
   * @param argv List of passed arguments.
   */
  public constructor(cwd: string, version: string, argv: string[]) {
    this.cwd = cwd;
    this.argv = argv;

    commander
      .version(version)
      .option("--out <out>", "path to output file")
      .option("--root <root>", "path to root directory")
      .option("--entry <entry>", "path to entry file");
  }

  /**
   * Resolves provided `relativePath` from current `cwd`.
   *
   * @param relativePath Path to resolve. If it's not relative, it will not change.
   */
  protected resolvePath(relativePath: string): string {
    return path.isAbsolute(relativePath)
      ? relativePath
      : path
          .join(this.cwd, relativePath)
          .split(path.delimiter)
          .filter(Boolean)
          .join(path.delimiter);
  }

  /**
   * Collects TypeScript files in `root` directory.
   *
   * @param root Relative root path.
   */
  protected collectFiles(root: string): string[] {
    const rootPath = this.resolvePath(root);
    const glob = new Glob(rootPath, "**/*.{ts,tsx}");

    return glob.find();
  }

  /**
   * Creates TypeScript Program from files in `root` directory.
   *
   * @param files Relative root path.
   */
  protected createProgram(files: string[]): ts.Program {
    return ts.createProgram(files, {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    });
  }

  /**
   * Generates documentation for `entry` file.
   *
   * @param entry Project entry point.
   * @param program TypeScript program.
   */
  protected generateDocs(entry: string, program: ts.Program): string {
    const entryPath = this.resolvePath(entry);

    const app = new App(entryPath, program);

    return app.generateDocs();
  }

  /**
   * Writes generated `docs` to `output` file.
   *
   * @param output Relative path to output file.
   * @param docs Generated documentation.
   */
  protected writeDocs(output: string, docs: string): void {
    const entryPath = this.resolvePath(output);

    fs.writeFileSync(entryPath, docs, "utf-8");
  }

  /**
   * Starts CLI process.
   */
  public bootstrap() {
    commander.parse(this.argv);

    const { entry = null, root = ".", out = "docs.md" } = commander;

    if (!root) {
      throw new Error("Pass 'root' directory path.");
    }

    if (!entry) {
      throw new Error("Pass 'entry' file path.");
    }

    try {
      const files = this.collectFiles(root);
      const program = this.createProgram(files);
      const docs = this.generateDocs(entry, program);

      this.writeDocs(out, docs);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error((e && e.stack) || e.message || "Unknown error");

      process.exit(1);
    }
  }
}
