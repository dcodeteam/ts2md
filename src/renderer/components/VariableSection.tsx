/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { VariableParseResult } from "../../parser/parsers/VariableParseResult";

interface Props {
  data: VariableParseResult;
}

export function VariableSection({ data }: Props) {
  const { id, documentation, type } = data;

  return (
    <section>
      <h3>
        Variable <code>{id}</code>
      </h3>

      {documentation && <section>{documentation}</section>}

      <pre language="typescript">
        const {id}: {type}
      </pre>
    </section>
  );
}
