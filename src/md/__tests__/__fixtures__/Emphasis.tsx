/** @jsx MD.createElement */

import { MD } from "../../MD";

export function Emphasis() {
  return (
    <section>
      <section>
        <em>Emphasis, aka italics</em>
      </section>

      <section>
        <strong>Strong emphasis, aka bold</strong>
      </section>

      <section>
        <strong>
          <em>Combined emphasis</em>
        </strong>
      </section>

      <section>
        <del>Strikethrough</del>
      </section>
    </section>
  );
}
