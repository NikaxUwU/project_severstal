import React, { useState } from "react";

{/* Создаю строки и делаю их кликабельными, если у элемента есть дочерние элементы,
то все они создаются. Рекурсия есть, конечно же */}

const Row = ({ item, level = 0  }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr onClick={() => setExpanded(!expanded)} style={{ transform: `translateX(${level * 50}px)`}}> {/* Для отсупов использую смещение по оси X, умножая значение на уровень */}
      <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.balance}</td>
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