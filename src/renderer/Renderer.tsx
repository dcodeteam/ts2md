/** @jsx MD.createElement */

import { MD, MDElement, MDNode } from "../md/MD";
import { MDRenderer } from "../md/MDRenderer";
import { ClassParseResult } from "../parser/parsers/ClassParseResult";
import { FunctionParseResult } from "../parser/parsers/FunctionParseResult";
import { InterfaceParseResult } from "../parser/parsers/InterfaceParseResult";
import { ProjectParseResult } from "../parser/parsers/ProjectParseResult";
import { VariableParseResult } from "../parser/parsers/VariableParseResult";
import { ClassSection } from "./components/ClassSection";
import { FunctionSection } from "./components/FunctionSection";
import { InterfaceSection } from "./components/InterfaceSection";
import { VariableSection } from "./components/VariableSection";

export class Renderer {
  private readonly element: MDElement<object>;

  public constructor(result: ProjectParseResult) {
    const sections: MDNode[] = [];

    result.modules.forEach(module => {
      module.nodes.forEach(node => {
        if (node instanceof ClassParseResult) {
          sections.push(<ClassSection data={node} />);
        }

        if (node instanceof InterfaceParseResult) {
          sections.push(<InterfaceSection data={node} />);
        }

        if (node instanceof FunctionParseResult) {
          sections.push(<FunctionSection data={node} />);
        }

        if (node instanceof VariableParseResult) {
          sections.push(<VariableSection data={node} />);
        }
      });

      return null;
    });

    this.element = <section>{sections}</section>;
  }

  public render(): string {
    return MDRenderer.renderToString(this.element);
  }
}
