import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { BaseRenderer } from "./BaseRenderer";
import { ConstructorRenderer } from "./ConstructorRenderer";

export class ClassRenderer extends BaseRenderer {
  private readonly result: ClassParseResult;

  public constructor(result: ClassParseResult) {
    super();

    this.result = result;
  }

  protected prerender(): void {
    const {
      id,
      extendedClass,
      documentation,
      implementedInterfaces
    } = this.result;

    this.addHeader(4, `Class ${id}`);

    if (extendedClass) {
      this.addHeader(3, `Extends ${extendedClass}`);
    }

    if (implementedInterfaces.length === 1) {
      this.addHeader(3, `Implements ${implementedInterfaces[0]}`);
    } else if (implementedInterfaces.length > 1) {
      this.addHeader(3, "Implements");
      this.addList(implementedInterfaces);
    }

    if (documentation) {
      this.addText(documentation);
      this.addLineBreak();
    }

    this.addLineBreak();

    this.result.constructors.forEach(constructor => {
      this.addText(new ConstructorRenderer(this.result, constructor).render());

      // if (constructors.accessibility !== "public") {
      //   return;
      // }
      // text.push(this.renderHeading(constructors.id));
      // text.push(
      //   this.renderCode(
      //     `new ${this.result.id}(${constructors.parameters
      //       .map(parameter => `${parameter.id}: ${parameter.type}`)
      //       .join(", ")}): ${this.result.id}`
      //   )
      // );
      // text.push("");
      //
      // if (constructors.documentation) {
      //   text.push(this.renderText(constructors.documentation));
      //   text.push("");
      // }
      //
      // if (constructors.parameters.length > 0) {
      //   text.push(this.renderHeading("Parameters"));
      //   text.push(
      //     this.renderList(
      //       constructors.parameters.map(
      //         x => `${this.renderBold(x.id)}: ${this.renderItalic(x.type)}`
      //       )
      //     )
      //   );
      // }
    });
  }
}
