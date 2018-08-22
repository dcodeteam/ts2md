import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import { Application } from "typedoc";

export class App {
  private app: Application;

  private entryFile: string;

  public constructor(entryFile: string) {
    this.entryFile = entryFile;
    this.app = new Application({

    });
  }

  private resolveDependencies(filePath: string): string[] {
    const output = [filePath];
    const sourceFile = ts.createSourceFile(
      filePath,
      fs.readFileSync(filePath, "utf-8"),
      ts.ScriptTarget.ES2018,
    );

    ts.forEachChild(sourceFile, node => {
      if (ts.isExportDeclaration(node)) {
        const { moduleSpecifier } = node;

        if (moduleSpecifier) {
          const dependencyPath = moduleSpecifier.getText(sourceFile);
          const dependency = dependencyPath.startsWith(".")
            ? path.join(path.dirname(filePath), dependencyPath)
            : null;

          if (dependency) {
            this.resolveDependencies(dependency).forEach(x => {
              output.push(x);
            });
          }
        }
      }
    });

    return output;
  }

  private fileToJson(filePath: string): object {
    const files = this.resolveDependencies(filePath);

    console.log(files);

    const src = this.app.expandInputFiles(files);
    const project = this.app.convert(src);

    return this.app.serializer.projectToObject(project);
  }

  public generateDocs(): string {
    console.log(
      "generateDocs",
      this.fileToJson(this.entryFile),
      "\n\n\n\n\n\n"
    );

    return "";
  }
}
