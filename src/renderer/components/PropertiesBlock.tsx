/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";
import { PropertiesBlockItem } from "./PropertiesBlockItem";

interface Props {
  data: ClassParseResult | InterfaceParseResult;
}

export function PropertiesBlock({ data }: Props) {
  const properties = data.properties.filter(x => x.accessibility !== "private");

  if (properties.length === 0) {
    return null;
  }

  return (
    <section>
      <h4>Properties</h4>

      {properties.map(x => (
        <PropertiesBlockItem data={x} parent={data} />
      ))}
    </section>
  );
}
