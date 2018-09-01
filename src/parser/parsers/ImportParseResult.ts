import * as ts from "typescript";

import { NodeParseResult } from "./NodeParseResult";

export interface ImportElement {
  id: string;
  importedId: string;
  modulePath: string;
}

export class ImportParseResult extends NodeParseResult {
  public imports: ImportElement[];

  public constructor(node: ts.ImportDeclaration) {
    super(node);

    this.imports = [];

    if (node.importClause && ts.isStringLiteral(node.moduleSpecifier)) {
      const { text: modulePath } = node.moduleSpecifier;

      // Include only relative modules.
      if (modulePath.startsWith(".")) {
        const { name, namedBindings } = node.importClause;

        if (name) {
          this.imports.push({
            modulePath,
            id: "default",
            importedId: name.text,
          });
        }

        if (namedBindings) {
          namedBindings.forEachChild(namedBinding => {
            if (ts.isImportSpecifier(namedBinding)) {
              const { text: importedId } = namedBinding.name;

              this.imports.push({
                modulePath,
                importedId,
                id: !namedBinding.propertyName
                  ? importedId
                  : namedBinding.propertyName.text,
              });
            }
          });
        }
      }
    }
  }
}
