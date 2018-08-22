import * as fs from "fs";
import * as path from "path";

import { App } from "../App";

describe("App", () => {
  const fixturesPath = path.join(__dirname, "../__fixtures__");

  fs.readdirSync(fixturesPath).forEach(dir => {
    const dirAbsolutePath = path.join(fixturesPath, dir);

    if (!fs.statSync(dirAbsolutePath).isDirectory()) {
      return;
    }

    test(dir, () => {
      const app = new App(path.join(dirAbsolutePath, "index.ts"));

      expect(app.generateDocs()).toMatchSnapshot();
    });
  });
});
