import React, { useState } from "react";

const Row = ({ item, level = 0  }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr onClick={() => setExpanded(!expanded)}>
      <td style={{ paddingLeft: `${level * 40}px` }}>{item.name}</td>
        <td style={{ paddingLeft: `${level * 40}px` }}>{item.email}</td>
        <td style={{ paddingLeft: `${level * 40}px` }}>{item.balance}</td>
      </tr>
      {expanded && item.children && item.children.length > 0 && (
        item.children.map((child) => (
          <Row key={child.id} item={child} level={level + 1} />
        ))
      )}
    </>
  );
};

export default Row;