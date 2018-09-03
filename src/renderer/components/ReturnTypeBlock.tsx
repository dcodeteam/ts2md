/** @jsx MD.createElement */

import { MD } from "../../md/MD";
import { NodeDocumentationTag } from "../../parser/parsers/NodeParseResult";

interface Props {
  returnType: string;
  documentationTags: NodeDocumentationTag[];
}

export function ReturnTypeBlock({ returnType, documentationTags }: Props) {
  const returnDocs = documentationTags.find(
    x => x.tag === "return" || x.tag === "returns",
  );

  return (
    <section>
      <h6>Returns</h6>

      <ul>
        <li>
          <code>{returnType}</code>
          {returnDocs != null &&
            returnDocs.comment && <section>${returnDocs.comment}</section>}
        </li>
      </ul>
    </section>
  );
}
