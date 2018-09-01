/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";
import { ConstructorsBlockItem } from "./ConstructorsBlockItem";

interface Props {
  data: ClassParseResult | InterfaceParseResult;
}

export function ConstructorsBlock({ data }: Props) {
  const constructors = data.constructors.filter(
    x => x.accessibility !== "private",
  );

  if (constructors.length === 0) {
    return null;
  }

  return (
    <section>
      <h4>Constructors</h4>

      {constructors.map(x => (
        <ConstructorsBlockItem data={x} parent={data} />
      ))}
    </section>
  );
}
