import * as path from "path";

import * as ts from "typescript";

import { Glob } from "../glob/Glob";
import { Parser } from "../parser/Parser";
import { Renderer } from "../renderer/Renderer";

const fixturesDir = path.join(__dirname, "__fixtures__");
const fixturesGlob = new Glob(fixturesDir, "**/*.ts");
const program = ts.createProgram(fixturesGlob.find(), {
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ESNext,
});

function textFixtures(type: string, spec: (filePath: string) => void) {
  expect.addSnapshotSerializer({
    test: x => typeof x === "string",
    print: raw => raw,
  });

  describe(type, () => {
    const specFixturesDir = path.join(fixturesDir, type);
    const specFixturesGlob = new Glob(specFixturesDir, "**/*.ts");

    specFixturesGlob.find().forEach(filePath => {
      const fileName = path.basename(filePath);

      test(fileName, () => {
        spec(filePath);
      });
    });
  });
}

export function testParser(type: string): void {
  textFixtures(type, filePath => {
    const parser = new Parser(fixturesDir, filePath, program);

    expect(parser.parse()).toMatchSnapshot();
  });
}

export function testRenderer(type: string): void {
  textFixtures(type, filePath => {
    const parser = new Parser(fixturesDir, filePath, program);
    const result = parser.parse();
    const renderer = new Renderer(result);

    expect(renderer.render()).toMatchSnapshot();
  });
}
