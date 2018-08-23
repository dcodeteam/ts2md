import * as fs from "fs";
import * as path from "path";

import { Parser } from "../../Parser";

export function parseFixtures(dir: string): void {
  describe(path.dirname(dir), () => {
    const fixturesDir = path.join(dir, "__fixtures__");

    test(fixturesDir, () => {});

    fs.readdirSync(fixturesDir).forEach(fileName => {
      if (!fileName.endsWith("ts")) {
        return;
      }

      test(fileName, () => {
        const filePath = path.join(fixturesDir, fileName);
        const fileSource = fs.readFileSync(filePath, "utf-8");
        const parser = new Parser(filePath, fileSource);

        expect(parser.parse()).toMatchSnapshot();
      });
    });
  });
}
