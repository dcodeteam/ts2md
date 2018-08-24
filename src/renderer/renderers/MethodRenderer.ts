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
      `${accessibility} ${id}(${parameters
        .map(x => `${x.id}: ${x.type}`)
        .join(", ")}): ${returnType};`
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
