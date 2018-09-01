/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { ClassParseResult } from "../../parser/parsers/ClassParseResult";
import { InterfaceParseResult } from "../../parser/parsers/InterfaceParseResult";
import { MethodsBlockItem } from "./MethodsBlockItem";

interface Props {
  data: ClassParseResult | InterfaceParseResult;
}

export function MethodsBlock({ data }: Props) {
  const methods = data.methods.filter(x => x.accessibility !== "private");

  if (methods.length === 0) {
    return null;
  }

  return (
    <section>
      <h4>Methods</h4>

      {methods.map(x => (
        <MethodsBlockItem data={x} parent={data} />
      ))}
    </section>
  );
}
