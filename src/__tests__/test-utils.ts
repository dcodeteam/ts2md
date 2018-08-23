import * as fs from "fs";
import * as path from "path";

import * as ts from "typescript";

import { Parser } from "../parser/Parser";
import { Renderer } from "../renderer/Renderer";

function textFixtures(
  type: string,
  spec: (filePath: string, program: ts.Program) => void
) {
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
      const fileName = path.basename(filePath);

      test(fileName, () => {
        spec(filePath, program);
      });
    });
  });
}

export function testParser(type: string): void {
  textFixtures(type, (filePath, program) => {
    const parser = new Parser(filePath, program);

    expect(parser.parse()).toMatchSnapshot();
  });
}

export function testRenderer(type: string): void {
  textFixtures(type, (filePath, program) => {
    const parser = new Parser(filePath, program);
    const result = parser.parse();
    const renderer = new Renderer(result);

    expect(renderer.render()).toMatchSnapshot();
  });
}
