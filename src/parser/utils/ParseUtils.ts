import * as ts from "typescript";

export function isNodeExported(node: ts.Declaration): boolean {
  // eslint-disable-next-line no-bitwise
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0;
}

export function isNodeDefaultExported(node: ts.Declaration): boolean {
  return (
    isNodeExported(node) &&
    // eslint-disable-next-line no-bitwise
    (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Default) !== 0
  );
}

export function isNodePublic(node: ts.Declaration): boolean {
  // eslint-disable-next-line no-bitwise
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Public) !== 0;
}

export function isNodePrivate(node: ts.Declaration): boolean {
  // eslint-disable-next-line no-bitwise
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Private) !== 0;
}

export function isNodeProtected(node: ts.Declaration): boolean {
  // eslint-disable-next-line no-bitwise
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Protected) !== 0;
}

export type NodeAccessibility = "public" | "protected" | "private";

export function getNodeAccessibility(node: ts.Declaration): NodeAccessibility {
  return isNodePrivate(node)
    ? "private"
    : isNodeProtected(node)
      ? "protected"
      : "public";
}

function typeToString(
  checker: ts.TypeChecker,
  type: ts.Type,
  typeNode?: ts.TypeNode
) {
  const typeString = checker.typeToString(type);

  return !typeNode || typeString !== "any" ? typeString : typeNode.getText();
}

export function getSymbolType(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
  typeNode?: ts.TypeNode
): string {
  return typeToString(
    checker,
    checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration),
    typeNode
  );
}

export function getSignatureType(
  checker: ts.TypeChecker,
  signature: ts.Signature,
  typeNode?: ts.TypeNode
): string {
  return typeToString(
    checker,
    checker.getReturnTypeOfSignature(signature),
    typeNode
  );
}
