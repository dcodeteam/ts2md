import { format } from "util";

import { format as formatCode } from "prettier";

import { AnyMDElement, MD, MDElement, MDNode } from "./MD";
import { MDChildren } from "./MDChildren";

export class MDRenderer {
  public static renderToString(rootElement: MDElement<object>): string {
    return new MDRenderer(rootElement).render();
  }

  protected rootElement: AnyMDElement;

  public constructor(rootElement: AnyMDElement) {
    this.rootElement = rootElement;
  }

  private invokeChildren(children: MDNode): MDNode[] {
    return MDChildren.toArray(children).map(
      child => (!MD.isMDElement(child) ? child : this.invokeElement(child)),
    );
  }

  private invokeElement(element: MDElement<object>): MDElement<object> {
    if (typeof element.type === "function") {
      return MD.createElement(
        element.type.name,
        null,
        ...this.invokeChildren(element.type(element.props)),
      );
    }

    return MD.createElement(
      element.type,
      element.props,
      ...this.invokeChildren(MDChildren.getChildren(element)),
    );
  }

  protected invokeElementTree(): AnyMDElement {
    return this.invokeElement(this.rootElement);
  }

  protected isBlockElement(element: MDElement<object>): boolean {
    switch (element.type) {
      case "span":
      case "em":
      case "strong":
      case "del":
      case "a":
      case "code":
        return false;
      default:
        return true;
    }
  }

  protected renderNode(node: MDNode): string {
    return !MD.isMDElement(node) ? String(node) : this.renderElement(node);
  }

  protected renderBlocks(children: MDNode): string[] {
    return MDChildren.toArray(children).reduce<string[]>((acc, child) => {
      let text = this.renderNode(child);
      const isBlock = MD.isMDElement(child) && this.isBlockElement(child);

      if (!isBlock && acc.length > 0) {
        text = acc.pop() + text;
      }

      acc.push(text);

      return acc;
    }, []);
  }

  protected renderChildren(children: MDNode): string {
    return this.renderBlocks(children).join("\n");
  }

  protected renderElementChildren(element: MDElement<object>): string {
    return this.renderChildren(MDChildren.getChildren(element));
  }

  private renderHeaderElement(element: MDElement<object>): string {
    const [, size] = (element.type as string).match(/^h([123456])$/)!;

    return format(
      "%s %s\n",
      "#".repeat(Number(size)),
      this.renderElementChildren(element),
    );
  }

  private renderWrappedElement(
    wrapper: string,
    element: MDElement<object>,
  ): string {
    return format(
      "%s%s%s",
      wrapper,
      this.renderElementChildren(element),
      wrapper,
    );
  }

  private renderListElement(element: MDElement<object>): string {
    const listMarker = element.type === "ul" ? "- " : "1. ";
    const listIndent = " ".repeat(listMarker.length);

    return this.renderBlocks(MDChildren.getChildren(element))
      .map(child =>
        child
          .split("\n")
          .map(
            (line, idx) => (idx === 0 ? listMarker + line : listIndent + line),
          )
          .join("\n"),
      )
      .join("\n");
  }

  protected renderElement(element: AnyMDElement): string {
    switch (element.type) {
      //
      // Header
      //

      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return this.renderHeaderElement(element);

      //
      // Emphasis
      //

      case "em":
        return this.renderWrappedElement("_", element);
      case "strong":
        return this.renderWrappedElement("**", element);
      case "del":
        return this.renderWrappedElement("~~", element);

      //
      // Lists
      //

      case "ol":
      case "ul":
        return this.renderListElement(element);
      case "li":
        return this.renderElementChildren(element);

      //
      // Links
      //

      case "a":
        return format(
          "[%s](%s)",
          this.renderElementChildren(element),
          element.props.href,
        );

      //
      // Images
      //

      case "img":
        return format(
          '![%s](%s "%s")\n',
          element.props.alt,
          element.props.src,
          element.props.title,
        );

      //
      // Code and Syntax Highlighting
      //

      case "pre":
        return format(
          "```%s\n%s\n```",
          element.props.language || "",
          MDChildren.toArray(element.props.children).join(""),
        );

      case "code":
        return this.renderWrappedElement("`", element);

      //
      // Table
      //

      case "tr": {
        const firstLine: string[] = [];
        const secondLine: string[] = [];

        this.renderBlocks(element.props.children).forEach(child => {
          const lines = child.split("\n");

          if (lines.length === 1) {
            // return lines;
            firstLine.push(child);
          } else {
            const lastLine = lines.pop();

            firstLine.push(lines.join("\n"));
            secondLine.push(lastLine!);
          }
        });

        const first = firstLine.join(" | ");

        if (firstLine.length !== secondLine.length) {
          return first;
        }

        return format("%s\n%s", first, secondLine.join(" | "));
      }

      case "th": {
        const { textAlign } = element.props;

        return format(
          "%s\n%s",
          this.renderElementChildren(element),
          textAlign === "center"
            ? ":-:"
            : textAlign === "right"
              ? "--:"
              : ":--",
        );
      }

      //
      // Blockquotes
      //

      case "blockquote":
        return this.renderBlocks(element.props.children)
          .map(x => format("> %s", x))
          .join("\n");

      case "hr":
        return "---";

      default:
        return this.renderElementChildren(element);
    }
  }

  protected formatOutput(text: string): string {
    return formatCode(text, { parser: "markdown" });
  }

  public render(): string {
    const elementTree = this.invokeElementTree();
    const text = this.renderElement(elementTree);

    return this.formatOutput(text);
  }
}
