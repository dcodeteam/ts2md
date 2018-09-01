import * as ts from "typescript";

export interface NodeDocumentationTag {
  tag: string;
  comment: string;
}

const ASTERIX_REGEX = /^((\s+)\*[\s]?)/;

function stringifyDocumentation(docs: ts.SymbolDisplayPart[]): string {
  const lines = ts.displayPartsToString(docs).split("\n");

  let codeStarted = false;

  return lines
    .map(line => {
      const result = !codeStarted ? line : line.replace(ASTERIX_REGEX, "");

      if (result.startsWith("```")) {
        codeStarted = !codeStarted;
      }

      return result;
    })
    .join("\n");
}

export class NodeParseResult {
  public id: string;

  public documentationTags: NodeDocumentationTag[];

  public documentation: string;

  public constructor(node: ts.Node) {
    this.id = "Anonymous";

    this.documentation = "";

    this.documentationTags = ts
      .getJSDocTags(node)
      .map(x => ({ tag: x.tagName.text, comment: x.comment || "" }));
  }

  protected fulfillSymbolData(
    symbol: ts.Symbol,
    checker: ts.TypeChecker,
  ): void {
    this.id = symbol.getName();
    this.documentation = stringifyDocumentation(
      symbol.getDocumentationComment(checker),
    );
  }

  protected fulfillSignatureData(
    signature: ts.Signature,
    checker: ts.TypeChecker,
  ) {
    this.documentation = stringifyDocumentation(
      signature.getDocumentationComment(checker),
    );
  }
}
