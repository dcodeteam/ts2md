export interface MDElement<P> {
  props: P;
  type: string | MDComponent<P>;
}

export type AnyMDElement = MDElement<any>;

const elements = new WeakSet();

export type MDNode =
  | null
  | number
  | string
  | boolean
  | undefined
  | MDNodeArray
  | AnyMDElement;

export interface MDComponent<P> {
  (props: P): MDNode;
}

interface MDNodeArray extends Array<MDNode> {}

// eslint-disable-next-line typescript/no-namespace
declare global {
  // eslint-disable-next-line typescript/no-namespace
  namespace JSX {
    /**
     * Element output type.
     */
    type Element = AnyMDElement;

    /**
     * Prop alias for tag children.
     */
    interface ElementChildrenAttribute {
      children: {};
    }

    /**
     * Registered tags.
     */
    interface IntrinsicElements {
      //
      // Span
      //

      span: { children: MDNode };

      //
      // Section
      //

      section: { children: MDNode };

      //
      // Header
      //

      h1: { children: MDNode };
      h2: { children: MDNode };
      h3: { children: MDNode };
      h4: { children: MDNode };
      h5: { children: MDNode };
      h6: { children: MDNode };

      //
      // Emphasis
      //

      em: { children: MDNode };
      strong: { children: MDNode };
      del: { children: MDNode };

      //
      // Lists
      //

      ul: { children: MDNode };
      ol: { children: MDNode };
      li: { children: MDNode };

      //
      // Links
      //

      a: {
        href: string;
        children: MDNode;
      };

      //
      // Images
      //

      img: {
        alt: string;
        src: string;
        title: string;
      };

      //
      // Code and Syntax Highlighting
      //

      pre: {
        language?: string;
        children: MDNode;
      };

      code: { children: MDNode };

      //
      // Table
      //

      table: { children: MDNode };
      tr: { children: MDNode };
      th: { children: MDNode; textAlign?: "left" | "center" | "right" };
      td: { children: MDNode };

      //
      // Blockquotes
      //

      blockquote: { children: MDNode };

      //
      // Horizontal Rule
      //

      hr: {};
    }
  }
}

export class MD {
  public static isMDElement(value: unknown): value is AnyMDElement {
    return typeof value === "object" && elements.has(value as object);
  }

  public static createElement(
    type: string,
    props: null | object,
    ...children: MDNode[]
  ): AnyMDElement {
    const element = {
      type,

      props: { ...props, children },
    };

    elements.add(element);

    return element;
  }
}
