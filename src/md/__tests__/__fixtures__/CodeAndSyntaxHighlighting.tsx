/** @jsx MD.createElement */

import { MD } from "../../MD";

export function CodeAndSyntaxHighlighting() {
  return (
    <section>
      <code>const a = 1;</code>

      <pre language="javascript">
        const a = 1;
        {"\n"}
        const b = 2;
      </pre>
    </section>
  );
}
