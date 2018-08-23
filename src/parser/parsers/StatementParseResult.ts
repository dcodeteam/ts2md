import * as ts from "typescript";

import { isNodeDefaultExported, isNodeExported } from "../utils/ParseUtils";
import { NodeParseResult } from "./NodeParseResult";

export class StatementParseResult extends NodeParseResult {
  public exported: boolean;

  public defaultExported: boolean;

  public constructor(node: ts.Declaration) {
    super(node);

    this.exported = isNodeExported(node);
    this.defaultExported = isNodeDefaultExported(node);
  }
}
