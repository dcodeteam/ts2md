import * as ts from "typescript";

export interface NodeJSDocTag {
  tag: string;
  comment: string;
}

export class NodeParseResult {
  public id: string;

  public kind: ts.SyntaxKind;

  public exported: boolean;

  public defaultExported: boolean;

  public docs: NodeJSDocTag[];

  public constructor(node: ts.Node) {
    this.id = "Anonymous";
    this.kind = node.kind;
    this.exported = false;
    this.defaultExported = false;

    this.docs = ts
      .getJSDocTags(node)
      .map(x => ({ tag: x.tagName.text, comment: x.comment || "" }));

    if (node.modifiers) {
      node.modifiers.forEach(x => {
        if (x.kind === ts.SyntaxKind.ExportKeyword) {
          this.exported = true;
        }

        if (x.kind === ts.SyntaxKind.DefaultKeyword) {
          this.defaultExported = true;
        }
      });
    }
  }
}
