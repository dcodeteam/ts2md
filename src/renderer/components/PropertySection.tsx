/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";
import { PropertyParseResult } from "../../parser/parsers/PropertyParseResult";

interface Props {
  data: PropertyParseResult;
  parent: ClassParseResult | InterfaceParseResult;
}

export function PropertySection({
  parent,
  data: { id, type, documentation, accessibility },
}: Props) {
  if (accessibility === "private") {
    return null;
  }

  const { id: parentId } = parent;
  const isClass = parent instanceof ClassParseResult;

  return (
    <section>
      <h5>
        <code>{id}</code>
      </h5>

      {documentation && <section>{documentation}</section>}

      {isClass ? (
        <pre language="typescript">
          class {parentId} {"{"}
          {accessibility} {id}:{type}
          {"}"}
        </pre>
      ) : (
        <pre language="typescript">
          interface {parentId} {"{"}
          {id}:{type}
          {"}"}
        </pre>
      )}
    </section>
  );
}
