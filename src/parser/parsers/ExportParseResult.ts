import * as ts from "typescript";

export interface ExportElement {
  id: string;
  exportedId: string;
}

export class ExportParseResult {
  public elements: ExportElement[];

  public modulePath: string;

  public constructor(node: ts.ExportDeclaration) {
    this.elements = [];
    this.modulePath = "";

    if (node.exportClause) {
      node.exportClause.elements.forEach(x => {
        this.elements.push({
          id: x.name.text,
          exportedId: !x.propertyName ? x.name.text : x.propertyName.text,
        });
      });
    }

    if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      this.modulePath = node.moduleSpecifier.text;
    }
  }
}
