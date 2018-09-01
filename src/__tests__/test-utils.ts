import * as path from "path";

import * as ts from "typescript";

import { Glob } from "../glob/Glob";
import { Parser } from "../parser/Parser";
import { Renderer } from "../renderer/Renderer";

function textFixtures(
  type: string,
  spec: (filePath: string, program: ts.Program) => void,
) {
  expect.addSnapshotSerializer({
    test: x => typeof x === "string",
    print: raw => raw,
  });

  describe(type, () => {
    const fixturesDir = path.join(__dirname, "__fixtures__");
    const fixturesGlob = new Glob(fixturesDir, "**/*.ts");
    const program = ts.createProgram(fixturesGlob.find(), {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    });

    const specFixturesDir = path.join(fixturesDir, type);
    const specFixturesGlob = new Glob(specFixturesDir, "**/*.ts");

    specFixturesGlob.find().forEach(filePath => {
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
