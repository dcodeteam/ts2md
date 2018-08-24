import { PropertyParseResult } from "../..";
import { BaseRenderer } from "./BaseRenderer";

export class PropertyRenderer extends BaseRenderer {
  private readonly result: PropertyParseResult;

  public constructor(result: PropertyParseResult) {
    super();

    this.result = result;
  }

  protected prerender(): void {
    const { id, type, accessibility, documentation } = this.result;

    if (accessibility === "private") {
      return;
    }

    this.addHeader(5, id);

    if (documentation) {
      this.addTextLine(documentation);
    }

    this.addCode(`${accessibility} ${id}: ${type};`);
  }
}
