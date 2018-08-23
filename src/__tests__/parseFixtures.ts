import * as fs from "fs";
import * as path from "path";

import * as ts from "typescript";

import { Parser } from "../parser/Parser";

export function parseFixtures(type: string): void {
  describe(type, () => {
    const fixturesDir = path.join(__dirname, "__fixtures__", type);

    const files = fs
      .readdirSync(fixturesDir)
      .filter(x => x.endsWith("ts"))
      .map(x => path.join(fixturesDir, x));

    const program = ts.createProgram(files, {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext
    });

    files.forEach(filePath => {
      const spec = path.basename(filePath);

      test(spec, () => {
        const parser = new Parser(filePath, program);

        expect(parser.parse()).toMatchSnapshot();
      });
    });
  });
}
