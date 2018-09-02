/** @jsx MD.createElement */

import { MD, MDNode } from "../md/MD";
import { MDRenderer } from "../md/MDRenderer";
import { ClassParseResult } from "../parser/parsers/ClassParseResult";
import { EnumParseResult } from "../parser/parsers/EnumParseResult";
import { FunctionParseResult } from "../parser/parsers/FunctionParseResult";
import { InterfaceParseResult } from "../parser/parsers/InterfaceParseResult";
import { NodeParseResult } from "../parser/parsers/NodeParseResult";
import { ProjectParseResult } from "../parser/parsers/ProjectParseResult";
import { VariableParseResult } from "../parser/parsers/VariableParseResult";
import { ClassSection } from "./components/ClassSection";
import { EnumSection } from "./components/EnumSection";
import { FunctionSection } from "./components/FunctionSection";
import { InterfaceSection } from "./components/InterfaceSection";
import { VariableSection } from "./components/VariableSection";

export class Renderer {
  private readonly result: ProjectParseResult;

  private readonly mdNodes: Map<NodeParseResult, MDNode>;

  private readonly moduleResultsMap: Map<string, Map<string, NodeParseResult>>;

  public constructor(result: ProjectParseResult) {
    this.result = result;
    this.mdNodes = new Map();
    this.moduleResultsMap = new Map();
  }

  private fulfillResultsMap() {
    this.result.modules.forEach(module => {
      if (this.moduleResultsMap.has(module.modulePath)) {
        return;
      }

      const nodes = new Map();

      module.nodes.forEach(node => {
        nodes.set(node.id, node);
      });

      this.moduleResultsMap.set(module.modulePath, nodes);
    });
  }

  private resolveModuleNode(
    modulePath: string,
    nodeId: string,
  ): NodeParseResult {
    const moduleNodes = this.moduleResultsMap.get(modulePath);

    if (!moduleNodes) {
      throw new Error(`Module "${modulePath}" not found .`);
    }

    const node = moduleNodes.get(nodeId);

    if (!node) {
      throw new Error(`Node "${nodeId}" not fond in module  "${modulePath}".`);
    }

    return node;
  }

  private documentNode(node: NodeParseResult): void {
    if (this.mdNodes.has(node)) {
      return;
    }

    if (node instanceof ClassParseResult) {
      this.mdNodes.set(node, <ClassSection data={node} />);
    }

    if (node instanceof InterfaceParseResult) {
      this.mdNodes.set(node, <InterfaceSection data={node} />);
    }

    if (node instanceof EnumParseResult) {
      this.mdNodes.set(node, <EnumSection data={node} />);
    }

    if (node instanceof FunctionParseResult) {
      if (node.exported || node.defaultExported) {
        this.mdNodes.set(node, <FunctionSection data={node} />);
      }
    }

    if (node instanceof VariableParseResult) {
      this.mdNodes.set(node, <VariableSection data={node} />);
    }
  }

  private visit(modulePath: string): void {
    const module = this.result.modules.get(modulePath);

    if (!module) {
      throw new Error(
        `Module "${modulePath}" not found. Expected:\n ${Array.from(
          this.result.modules.keys(),
        ).join(", ")}`,
      );
    }

    // Document internal nodes.
    module.nodes.forEach(node => {
      this.documentNode(node);
    });

    // Document reexported nodes.
    module.reexports.forEach(reexport => {
      reexport.elements.forEach(exportElement => {
        this.documentNode(
          this.resolveModuleNode(reexport.modulePath, exportElement.id),
        );
      });
    });

    // Visit reexported dependencies.
    module.reexports.forEach(x => {
      this.visit(x.modulePath);
    });

    // Visit imported dependencies.
    module.imports.forEach(({ imports }) => {
      imports.forEach(x => {
        this.visit(x.modulePath);
      });
    });
  }

  private visitEntry(): void {
    this.visit(this.result.entryModule);
  }

  public render(): string {
    this.fulfillResultsMap();

    this.visitEntry();

    return MDRenderer.renderToString(
      <section>{Array.from(this.mdNodes.values())}</section>,
    );
  }
}
