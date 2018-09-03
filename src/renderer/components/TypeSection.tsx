/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { TypeParseResult } from "../../parser/parsers/TypeParseResult";

interface Props {
  data: TypeParseResult;
}

export function TypeSection({ data }: Props) {
  const { id, documentation, type } = data;

  return (
    <section>
      <h3>
        Type <code>{id}</code>
      </h3>

      {documentation && <section>{documentation}</section>}

      <pre language="typescript">
        type {id}: {type}
      </pre>
    </section>
  );
}
