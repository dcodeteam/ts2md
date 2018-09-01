import { MDRenderer } from "../MDRenderer";
import { testMDFixtures } from "./md-test-utils";

testMDFixtures("MDRenderer", MDRenderer.renderToString);
