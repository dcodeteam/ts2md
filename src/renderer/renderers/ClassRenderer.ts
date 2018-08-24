import { format } from "util";

import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { BaseRenderer } from "./BaseRenderer";
import { ConstructorRenderer } from "./ConstructorRenderer";
import { MethodRenderer } from "./MethodRenderer";
import { PropertyRenderer } from "./PropertyRenderer";

export class ClassRenderer extends BaseRenderer {
  private readonly result: ClassParseResult;

  public constructor(result: ClassParseResult) {
    super();

    this.result = result;
  }

  protected prerender(): void {
    const {
      id,
      methods,
      properties,
      constructors,
      extendedClass,
      documentation,
      implementedInterfaces
    } = this.result;

    this.addHorizontalLine();
    this.addHeader(3, format("Class %s", this.makeCode(id)));

    if (extendedClass) {
      this.addHeader(4, format("Extends %s", this.makeCode(extendedClass)));
    }

    if (implementedInterfaces.length === 1) {
      this.addHeader(
        4,
        format("Implements %s", this.makeCode(implementedInterfaces[0]))
      );
    } else if (implementedInterfaces.length > 1) {
      this.addHeader(4, "Implements");
      this.addList(implementedInterfaces.map(x => this.makeCode(x)));
    }

    if (documentation) {
      this.addTextLine(documentation);
    }

    if (constructors.length > 0) {
      this.addHeader(4, "Constructors");

      constructors.forEach(x => {
        this.addText(new ConstructorRenderer(this.result, x).render());
      });
    }

    if (properties.length > 0) {
      this.addHeader(4, "Properties");

      properties.forEach(x => {
        this.addText(new PropertyRenderer(x).render());
      });
    }

    if (methods.length > 0) {
      this.addHeader(4, "Methods");

      methods.forEach(x => {
        this.addText(new MethodRenderer(x).render());
      });
    }
  }
}
