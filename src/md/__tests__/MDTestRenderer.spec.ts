import { MDTestRenderer } from "../MDTestRenderer";
import { testMDFixtures } from "./md-test-utils";

testMDFixtures("MDTestRenderer", MDTestRenderer.renderToString);
