import { ParserResult } from "../parser/Parser";
import { ClassParseResult } from "../parser/parsers/ClassParseResult";
import { ClassRenderer } from "./renderers/ClassRenderer";

export class Renderer {
  private parseResult: ParserResult;

  private renderedBlocks?: string[];

  public constructor(result: ParserResult) {
    this.parseResult = result;
  }

  public render(): string {
    if (!this.renderedBlocks) {
      const blocks: string[] = [];

      this.parseResult.nodes.forEach(x => {
        if (x instanceof ClassParseResult) {
          blocks.push(new ClassRenderer(x).render());
        }
      });

      this.renderedBlocks = blocks;
    }

    return this.renderedBlocks.join("\n");
  }
}
