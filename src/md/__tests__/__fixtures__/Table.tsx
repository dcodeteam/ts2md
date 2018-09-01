/** @jsx MD.createElement */

import { MD } from "../../MD";

export function Table() {
  return (
    <table>
      <tr>
        <th>Tables</th>
        <th textAlign="center">Are</th>
        <th textAlign="right">Cool</th>
      </tr>

      <tr>
        <td>col 3 is</td>
        <td>right-aligned</td>
        <td>$1600</td>
      </tr>

      <tr>
        <td>col 2 is</td>
        <td>centered</td>
        <td>$12</td>
      </tr>

      <tr>
        <td>zebra stripes</td>
        <td>are neat</td>
        <td>$1</td>
      </tr>
    </table>
  );
}
