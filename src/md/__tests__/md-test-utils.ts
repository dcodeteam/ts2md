import * as path from "path";

import { Glob } from "../../glob/Glob";
import { MD, MDElement } from "../MD";

export function testMDFixtures(
  name: string,
  renderer: (value: MDElement<object>) => string,
) {
  expect.addSnapshotSerializer({ test: MD.isMDElement, print: renderer });

  describe(name, () => {
    const fixturesDir = path.join(__dirname, "__fixtures__");
    const fixturesGlob = new Glob(fixturesDir, "**/*.tsx");

    fixturesGlob.find().forEach(filePath => {
      const fileName = path.basename(filePath);

      test(fileName, () => {
        // eslint-disable-next-line import/no-dynamic-require,global-require,typescript/no-var-requires
        const components = require(filePath);

        Object.keys(components).map(key => {
          const Component = components[key];

          expect(MD.createElement(Component, null)).toMatchSnapshot();
        });
      });
    });
  });
}
