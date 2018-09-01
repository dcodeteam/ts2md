/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { ConstructorsBlock } from "./ConstructorsBlock";
import { MethodsBlock } from "./MethodsBlock";
import { PropertiesBlock } from "./PropertiesBlock";

interface Props {
  data: ClassParseResult;
}

export function ClassSection({ data }: Props) {
  const { id, extendedClass, documentation, implementedInterfaces } = data;

  return (
    <section>
      <h3>
        Class <code>{id}</code>
      </h3>

      {extendedClass && (
        <h4>
          Extends <code>{extendedClass}</code>
        </h4>
      )}

      {implementedInterfaces.length === 1 ? (
        <h4>
          Implements <code>{implementedInterfaces[0]}</code>
        </h4>
      ) : implementedInterfaces.length > 1 ? (
        <section>
          <h4>Implements</h4>
          <ul>
            {implementedInterfaces.map(x => (
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
