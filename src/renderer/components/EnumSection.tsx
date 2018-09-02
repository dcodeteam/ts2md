/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { EnumParseResult } from "../../parser/parsers/EnumParseResult";

interface Props {
  data: EnumParseResult;
}

export function EnumSection({ data }: Props) {
  const { id, members, documentation } = data;

  return (
    <section>
      <h3>
        Enumeration <code>{id}</code>
      </h3>

      {documentation && <section>{documentation}</section>}

      {members.length > 0 && (
        <section>
          <h4>Enumeration members</h4>

          <ul>
            {members.map(x => (
              <li>
                <strong>{x.id}</strong>
                {x.value != null && (
                  <span>
                    : <code>{x.value}</code>
                  </span>
                )}
                {x.documentation && <section>{x.documentation}</section>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
