import * as commander from "commander";
import * as path from "path";
import { App } from "../app/App";

export class Cli {
  private readonly cwd: string;

  private readonly argv: string[];

  public constructor(cwd: string, version: string, argv: string[]) {
    this.cwd = cwd;
    this.argv = argv;

    commander
      .version(version)
      .option("--entry <entry>", "path to entry file")
      .option("--project [path]", "path to tsconfig file");
  }

  public bootstrap() {
    commander.parse(this.argv);

    const { entry, project = "tsconfig.json" } = commander;

    if (!entry) {
      throw new Error("Pass 'entry' file.");
    }

    if (!project || typeof project !== "string") {
      throw new Error("Invalid 'project' value.");
    }

    const entryPath = path.join(this.cwd, entry);
    const projectPath = path.join(this.cwd, project);

    const app = new App(entryPath, projectPath);

    app.generateJson();
  }
}
