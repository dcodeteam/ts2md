/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";
import { ConstructorSection } from "./ConstructorSection";
import { MethodSection } from "./MethodSection";
import { PropertySection } from "./PropertySection";

interface Props {
  data: InterfaceParseResult;
}

export function InterfaceSection({ data }: Props) {
  const { id, documentation, extendedInterfaces } = data;

  const methods = data.methods.filter(x => x.accessibility !== "private");
  const properties = data.properties.filter(x => x.accessibility !== "private");
  const constructors = data.constructors.filter(
    x => x.accessibility !== "private",
  );

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

      {constructors.length > 0 && (
        <section>
          <h4>Constructors</h4>

          {constructors.map(x => (
            <ConstructorSection data={x} parent={data} />
          ))}
        </section>
      )}

      {properties.length > 0 && (
        <section>
          <h4>Properties</h4>

          {properties.map(x => (
            <PropertySection data={x} parent={data} />
          ))}
        </section>
      )}

      {methods.length > 0 && (
        <section>
          <h4>Methods</h4>

          {methods.map(x => (
            <MethodSection data={x} parent={data} />
          ))}
        </section>
      )}
    </section>
  );
}
