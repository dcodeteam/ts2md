/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";
import { MethodParseResult } from "../../parser/parsers/MethodParseResult";

interface Props {
  data: MethodParseResult;
  parent: ClassParseResult | InterfaceParseResult;
}

export function MethodSection({
  parent,
  data: { id, parameters, returnType, documentation, accessibility },
}: Props) {
  if (accessibility === "private") {
    return null;
  }

  const { id: parentId } = parent;
  const isClass = parent instanceof ClassParseResult;
  const args = parameters.map(x => `${x.id}: ${x.type}`).join(", ");

  return (
    <section>
      <h5>
        <code>{id}</code>
      </h5>

      {documentation && <section>{documentation}</section>}

      {isClass ? (
        <pre language="typescript">
          class {parentId} {"{"}
          {accessibility} {id}( {args} ): {returnType}
          {"}"}
        </pre>
      ) : (
        <pre language="typescript">
          interface {parentId} {"{"}
          {id}( {args} ): {returnType}
          {"}"}
        </pre>
      )}

      {parameters.length > 0 && (
        <section>
          <h6>Parameters</h6>

          <ul>
            {parameters.map(x => (
              <li>
                <strong>{x.id}</strong>: <code>{x.type}</code>
                {x.documentation && <section>{x.documentation}</section>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
