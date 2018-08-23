import * as fs from "fs";
import * as path from "path";

import * as ts from "typescript";

import { Parser } from "../../Parser";

export function parseFixtures(dir: string): void {
  describe(path.dirname(dir), () => {
    const fixturesDir = path.join(dir, "__fixtures__");

    const files = fs
      .readdirSync(fixturesDir)
      .filter(x => x.endsWith("ts"))
      .map(x => path.join(fixturesDir, x));

    const program = ts.createProgram(files, {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext
    });

    files.forEach(filePath => {
      test(path.basename(filePath), () => {
        const parser = new Parser(filePath, program);

        expect(parser.parse()).toMatchSnapshot();
      });
    });
  });
}
