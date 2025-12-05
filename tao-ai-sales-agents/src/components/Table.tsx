import React from "react";
import { styles } from "../styles";

type TableProps = {
  headers: string[];
  rows: (string | number)[][];
};

export const Table: React.FC<TableProps> = ({ headers, rows }) => (
  <div className="table-wrapper" style={{ overflowX: "auto", width: "100%" }}>
    <table style={styles.table}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={styles.th}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} style={styles.td}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
