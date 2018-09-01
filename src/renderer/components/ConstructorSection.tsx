/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { ConstructorParseResult } from "../../parser/parsers/ConstructorParseResult";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";

interface Props {
  data: ConstructorParseResult;
  parent: ClassParseResult | InterfaceParseResult;
}

export function ConstructorSection({
  parent,
  data: { parameters, documentation, accessibility },
}: Props) {
  const { id: parentId } = parent;

  if (accessibility === "private") {
    return null;
  }

  const isClass = parent instanceof ClassParseResult;
  const args = parameters.map(x => `${x.id}: ${x.type}`).join(", ");

  return (
    <section>
      {documentation && <section>{documentation}</section>}

      {isClass ? (
        <pre language="typescript">
          class {parentId} {"{"}
          {accessibility} constructor( {args} );
          {"}"}
        </pre>
      ) : (
        <pre language="typescript">
          interface {parentId} {"{"}
          new ( {args} ): {parentId}
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
