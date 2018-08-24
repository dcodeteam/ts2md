import { format } from "util";

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
      format(
        "new %s(%s);",
        parentId,
        parameters.map(x => format("%s: %s", x.id, x.type)).join(", ")
      )
    );

    if (parameters.length > 0) {
      this.addHeader(6, "Parameters");

      this.addList(
        parameters.map(x => {
          const line = format(
            "%s: %s",
            this.makeBold(x.id),
            this.makeCode(x.type)
          );

          return !x.documentation
            ? line
            : format("%s\n%s", line, x.documentation);
        })
      );
    }
  }
}
