import { format } from "util";

import { format as formatCode } from "prettier";

import { MDElement } from "./MD";
import { MDRenderer } from "./MDRenderer";

export class MDTestRenderer extends MDRenderer {
  public static renderToString(rootElement: MDElement<object>): string {
    return new MDTestRenderer(rootElement).render();
  }

  protected renderElement(element: MDElement<object>): string {
    const { type, props } = element;
    const children = this.renderElementChildren(element);
    const properties = Object.keys(props)
      .map(key => {
        if (key === "children") {
          return null;
        }

        // eslint-disable-next-line typescript/no-explicit-any
        const prop = (props as any)[key];

        if (typeof prop === "undefined") {
          return null;
        }

        if (typeof prop === "string") {
          return format('%s="%s"', key, prop);
        }

        return format("%s={prop}", key, prop);
      })
      .filter(Boolean)
      .join(" ");

    return format("<%s %s>%s</%s>", type, properties, children, type);
  }

  protected formatOutput(text: string): string {
    return formatCode(text.replace(/(?:\n)/g, '{"\\n"}'), {
      parser: "babylon",
    });
  }
}
