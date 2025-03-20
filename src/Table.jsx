import React, { useState } from "react";
import Row from "./Row";
import { buildTree } from "./DataTree";

const Table = ({data}) => {
  
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const sortData = (data) => {
    if (!sortBy || !sortOrder) return data; 
    return [...data].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "balance") {
        const balanceA = parseFloat(a.balance.replace(/[$,]/g, ""));
        const balanceB = parseFloat(b.balance.replace(/[$,]/g, ""));
        comparison = balanceA - balanceB;
      }
      else if (sortBy === "email") {
        comparison = a.email.localeCompare(b.email);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const SortByBalance = () => {
    setSortBy("balance");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
  };
  
  const SortByEmail = () => {
    setSortBy("email");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };  

  const treeData = buildTree(sortData(data));

  return (
    <div>
      <button onClick={SortByBalance}>
        Сортировать по балансу ({sortOrder === "asc" ? "по возрастанию" : "по убыванию"})
      </button>
      <button onClick={SortByEmail}>
        Сортировать по Email ({sortOrder === "asc" ? "по возрастанию" : "по убыванию"})
      </button>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Баланс</th>
          </tr>
        </thead>
        <tbody>
          {treeData.map(item => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;