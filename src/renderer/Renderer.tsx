/** @jsx MD.createElement */

import { MD, MDElement } from "../md/MD";
import { MDRenderer } from "../md/MDRenderer";
import { ParseResult } from "../parser/Parser";
import { ClassParseResult } from "../parser/parsers/ClassParseResult";
import { InterfaceParseResult } from "../parser/parsers/InterfaceParseResult";
import { ClassSection } from "./components/ClassSection";
import { InterfaceSection } from "./components/InterfaceSection";

export class Renderer {
  private readonly element: MDElement<object>;

  public constructor(result: ParseResult) {
    this.element = (
      <section>
        {result.nodes.map(data => {
          if (data instanceof ClassParseResult) {
            return <ClassSection data={data} />;
          }

          if (data instanceof InterfaceParseResult) {
            return <InterfaceSection data={data} />;
          }

          return null;
        })}
      </section>
    );
  }

  public render(): string {
    return MDRenderer.renderToString(this.element);
  }
}
