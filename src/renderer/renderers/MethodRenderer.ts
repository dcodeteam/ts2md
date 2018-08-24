import { format } from "util";

import { MethodParseResult } from "../../parser/parsers/MethodParseResult";
import { BaseRenderer } from "./BaseRenderer";

export class MethodRenderer extends BaseRenderer {
  private readonly result: MethodParseResult;

  public constructor(result: MethodParseResult) {
    super();

    this.result = result;
  }

  protected prerender(): void {
    const {
      id,
      parameters,
      returnType,
      accessibility,
      documentation
    } = this.result;

    if (accessibility === "private") {
      return;
    }

    this.addHeader(5, id);

    if (documentation) {
      this.addTextLine(documentation);
    }

    this.addCode(
      format(
        "%s %s(%s): %s;",
        accessibility,
        id,
        parameters.map(x => format("%s: %s", x.id, x.type)),
        returnType
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

          return !x.documentation ? line : `${line}\n${x.documentation}`;
        })
      );
    }
  }
}
