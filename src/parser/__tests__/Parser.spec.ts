import * as fs from "fs";
import * as path from "path";
import { Parser } from "../Parser";

describe("Parser", () => {
  const fixturesDir = path.join(__dirname, "__fixtures__");

  fs.readdirSync(fixturesDir).forEach(file => {
    if (!file.endsWith(".ts")) {
      return;
    }

    test(file, () => {
      const filePath = path.join(fixturesDir, file);
      const sourceText = fs.readFileSync(filePath, "utf-8");

      const parser = new Parser(filePath, sourceText);

      expect(parser.parse()).toMatchSnapshot();
    });
  });
});
