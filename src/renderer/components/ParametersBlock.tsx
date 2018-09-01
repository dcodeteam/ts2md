/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ParameterParseResult } from "../../parser/parsers/ParameterParseResult";

interface Props {
  data: ParameterParseResult[];
}

export function ParametersBlock({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  return (
    <section>
      <h6>Parameters</h6>

      <ul>
        {data.map(x => (
          <li>
            <strong>{x.id}</strong>: <code>{x.type}</code>
            {x.documentation && <section>{x.documentation}</section>}
          </li>
        ))}
      </ul>
    </section>
  );
}
