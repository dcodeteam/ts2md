/** @jsx MD.createElement */

import { MD } from "../../MD";

export function Lists() {
  return (
    <section>
      <ol>
        <li>Ordered</li>
        <li>List</li>
      </ol>

      <ul>
        <li>Unsorted</li>
        <li>List</li>
      </ul>

      <ol>
        <li>
          Nested:
          <ol>
            <li>Ordered</li>
            <li>List</li>
          </ol>
        </li>

        <li>
          Nested:
          <ol>
            <li>Ordered</li>
            <li>List</li>
          </ol>
        </li>

        <li>
          Nested:
          <ol>
            <li>Ordered</li>
            <li>List</li>
          </ol>
        </li>
      </ol>

      <ul>
        <li>
          Nested:
          <ul>
            <li>Ordered</li>
            <li>List</li>
          </ul>
        </li>

        <li>
          Nested:
          <ul>
            <li>Ordered</li>
            <li>List</li>
          </ul>
        </li>

        <li>
          Nested:
          <ul>
            <li>Ordered</li>
            <li>List</li>
          </ul>
        </li>
      </ul>

      <ol>
        <li>
          Nested:
          <ul>
            <li>Ordered</li>
            <li>List</li>
          </ul>
        </li>

        <li>
          Nested:
          <ul>
            <li>Ordered</li>
            <li>List</li>
          </ul>
        </li>

        <li>
          Nested:
          <ul>
            <li>Ordered</li>
            <li>List</li>
          </ul>
        </li>
      </ol>
    </section>
  );
}
