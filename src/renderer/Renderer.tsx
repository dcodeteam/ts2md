/** @jsx MD.createElement */

import { MD, MDNode } from "../md/MD";
import { MDRenderer } from "../md/MDRenderer";
import { ProjectParseResult } from "../parser/parsers/ProjectParseResult";
import { ClassParseResult } from "../parser/parsers/ClassParseResult";
import { ClassSection } from "./components/ClassSection";
import { InterfaceParseResult } from "../parser/parsers/InterfaceParseResult";
import { InterfaceSection } from "./components/InterfaceSection";
import { FunctionParseResult } from "../parser/parsers/FunctionParseResult";
import { FunctionSection } from "./components/FunctionSection";
import { VariableParseResult } from "../parser/parsers/VariableParseResult";
import { VariableSection } from "./components/VariableSection";

export class Renderer {
  private readonly result: ProjectParseResult;

  public constructor(result: ProjectParseResult) {
    this.result = result;
  }

  private visit(modulePath: string, sections: MDNode[]): void {
    const module = this.result.modules.get(modulePath);

    if (!module) {
      throw new Error(`Module "${module}" not found.`);
    }

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
  }

  public render(): string {
    const sections: MDNode[] = [];

    this.visit(this.result.entryModule, sections);

    return MDRenderer.renderToString(<section>{sections}</section>);
  }
}
