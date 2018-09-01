/** @jsx MD.createElement */

import { MD } from "../../MD";

export function Blockquotes() {
  return (
    <blockquote>
      This is a very long line that will still be quoted properly when it wraps.
      Oh boy lets keep writing to make sure this is long enough to actually wrap
      for everyone. Oh, you can put <strong>Markdown</strong> <em>into</em> a
      blockquote.
    </blockquote>
  );
}
