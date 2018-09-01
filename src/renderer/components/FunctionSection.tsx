/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { FunctionParseResult } from "../../parser/parsers/FunctionParseResult";
import { ParametersBlock } from "./ParametersBlock";

interface Props {
  data: FunctionParseResult;
}

export function FunctionSection({ data }: Props) {
  const { id, documentation, returnType, parameters } = data;

  const args = parameters.map(x => `${x.id}: ${x.type}`).join(", ");

  return (
    <section>
      <h3>
        Function <code>{id}</code>
      </h3>

      {documentation && <section>{documentation}</section>}

      <pre language="typescript">
        function {id} ({args}) : {returnType}
      </pre>

      <ParametersBlock data={parameters} />
    </section>
  );
}
