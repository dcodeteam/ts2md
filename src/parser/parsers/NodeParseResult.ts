import * as ts from "typescript";

export interface NodeDocumentationTag {
  tag: string;
  comment: string;
}

export class NodeParseResult {
  public id: string;

  public kind: ts.SyntaxKind;

  public documentationTags: NodeDocumentationTag[];

  public documentation: string;

  public constructor(node: ts.Node) {
    this.id = "Anonymous";
    this.kind = node.kind;

    this.documentation = "";

    this.documentationTags = ts
      .getJSDocTags(node)
      .map(x => ({ tag: x.tagName.text, comment: x.comment || "" }));
  }

  protected fulfillSymbolData(
    symbol: ts.Symbol,
    checker: ts.TypeChecker
  ): void {
    this.id = symbol.getName();
    this.documentation = ts.displayPartsToString(
      symbol.getDocumentationComment(checker)
    );
  }

  protected fulfillSignatureData(
    signature: ts.Signature,
    checker: ts.TypeChecker
  ) {
    this.documentation = ts.displayPartsToString(
      signature.getDocumentationComment(checker)
    );
  }
}
