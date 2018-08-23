import * as fs from "fs";
import * as path from "path";

import * as commander from "commander";

import { App } from "../app/App";

export class Cli {
  private readonly cwd: string;

  private readonly argv: string[];

  public constructor(cwd: string, version: string, argv: string[]) {
    this.cwd = cwd;
    this.argv = argv;

    commander
      .version(version)
      .option("--out <out>", "path to output file")
      .option("--entry <entry>", "path to entry file");
  }

  public bootstrap() {
    commander.parse(this.argv);

    const { entry, out = "docs.json" } = commander;

    if (!entry) {
      throw new Error("Pass 'entry' file.");
    }

    const entryPath = path.join(this.cwd, entry);
    const outputPath = path.join(this.cwd, out);

    const app = new App(entryPath);
    const docs = app.generateDocs();

    fs.writeFileSync(outputPath, docs, "utf-8");
  }
}
