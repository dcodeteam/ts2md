/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";
import { ConstructorsBlock } from "./ConstructorsBlock";
import { MethodsBlock } from "./MethodsBlock";
import { PropertiesBlock } from "./PropertiesBlock";

interface Props {
  data: InterfaceParseResult;
}

export function InterfaceSection({ data }: Props) {
  const { id, documentation, extendedInterfaces } = data;

  return (
    <section>
      <h3>
        Interface <code>{id}</code>
      </h3>

      {extendedInterfaces.length === 1 ? (
        <h4>
          Extends <code>{extendedInterfaces[0]}</code>
        </h4>
      ) : extendedInterfaces.length > 1 ? (
        <section>
          <h4>Extends</h4>
          <ul>
            {extendedInterfaces.map(x => (
              <li>
                <code>{x}</code>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {documentation && <section>{documentation}</section>}

      <ConstructorsBlock data={data} />
      <PropertiesBlock data={data} />
      <MethodsBlock data={data} />
    </section>
  );
}
