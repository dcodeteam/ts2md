import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { ConstructorParseResult } from "../../parser/parsers/ConstructorParseResult";
import { BaseRenderer } from "./BaseRenderer";

export class ConstructorRenderer extends BaseRenderer {
  private readonly parent: ClassParseResult;

  private readonly result: ConstructorParseResult;

  public constructor(parent: ClassParseResult, result: ConstructorParseResult) {
    super();

    this.parent = parent;
    this.result = result;
  }

  protected prerender(): void {
    const { id: parentId } = this.parent;
    const { parameters, documentation, accessibility } = this.result;

    if (accessibility !== "public") {
      return;
    }

    if (documentation) {
      this.addTextLine(documentation);
    }

    this.addCode(
      `new ${parentId}(${parameters
        .map(x => `${x.id}: ${x.type}`)
        .join(", ")});`
    );

    if (parameters.length > 0) {
      this.addHeader(6, "Parameters");

      this.addList(
        parameters.map(x => {
          const line = `${this.makeBold(x.id)}: ${this.makeCode(x.type)}`;

          return !x.documentation ? line : `${line}\n${x.documentation}`;
        })
      );
    }
  }
}
