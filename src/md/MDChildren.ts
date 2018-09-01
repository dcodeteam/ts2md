import { AnyMDElement, MDNode } from "./MD";

function flattenDeep(array: unknown[]): unknown[] {
  return array.reduce<unknown[]>(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    [],
  );
}
export class MDChildren {
  public static toArray(children: MDNode): MDNode[] {
    const childrenArray = !Array.isArray(children)
      ? [children]
      : (flattenDeep(children) as MDNode[]);

    return childrenArray.filter(x => x !== false && x != null);
  }

  public static getChildren(element: AnyMDElement): MDNode[] {
    return MDChildren.toArray(element.props.children);
  }
}
