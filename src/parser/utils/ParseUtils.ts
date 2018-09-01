import * as ts from "typescript";

import { MemberParseResult } from "../parsers/MemberParseResult";

function isNodeFlaggedWith(
  node: ts.Declaration,
  flag: ts.ModifierFlags,
): boolean {
  // eslint-disable-next-line no-bitwise
  return (ts.getCombinedModifierFlags(node) & flag) !== 0;
}

export function isNodeExported(node: ts.Declaration): boolean {
  return isNodeFlaggedWith(node, ts.ModifierFlags.Export);
}

export function isNodeDefaultExported(node: ts.Declaration): boolean {
  return (
    isNodeExported(node) && isNodeFlaggedWith(node, ts.ModifierFlags.Default)
  );
}

export function isNodePublic(node: ts.Declaration): boolean {
  return isNodeFlaggedWith(node, ts.ModifierFlags.Public);
}

export function isNodePrivate(node: ts.Declaration): boolean {
  return isNodeFlaggedWith(node, ts.ModifierFlags.Private);
}

export function isNodeProtected(node: ts.Declaration): boolean {
  return isNodeFlaggedWith(node, ts.ModifierFlags.Protected);
}

export type NodeAccessibility = "public" | "protected" | "private";

export function getNodeAccessibility(
  node: ts.Declaration,
): undefined | NodeAccessibility {
  return isNodePublic(node)
    ? "public"
    : isNodeProtected(node)
      ? "protected"
      : isNodePrivate(node)
        ? "private"
        : undefined;
}

const accessibilityWeight = {
  public: 1,
  protected: 2,
  private: 3,
};

export function compareAccessibility(
  a: MemberParseResult,
  b: MemberParseResult,
): number {
  const aWeight = accessibilityWeight[a.accessibility || "public"];
  const bWeight = accessibilityWeight[b.accessibility || "public"];

  return aWeight - bWeight;
}

function typeToString(
  checker: ts.TypeChecker,
  type: ts.Type,
  typeNode?: ts.TypeNode,
) {
  const typeString = checker.typeToString(type);

  return !typeNode || typeString !== "any" ? typeString : typeNode.getText();
}

export function getSymbolType(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
  typeNode?: ts.TypeNode,
): string {
  return typeToString(
    checker,
    checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration),
    typeNode,
  );
}

export function getSignatureType(
  checker: ts.TypeChecker,
  signature: ts.Signature,
  typeNode?: ts.TypeNode,
): string {
  return typeToString(
    checker,
    checker.getReturnTypeOfSignature(signature),
    typeNode,
  );
}
