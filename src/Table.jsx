import React, { useState } from "react";
import Row from "./Row";
import { buildTree } from "./DataTree";
import { filterData } from "./filterData";

const Table = ({data}) => {
  const [filterState, setFilterState] = useState("all"); 
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

  
  const toggleFilter = () => {
    if (filterState === "all") {
      setFilterState("active");
    } else if (filterState === "active") {
      setFilterState("inactive");
    } else {
      setFilterState("all");
    }
  };

  const filteredData = filterData(treeData, filterState);
  
  return (
    <div>
      <div class="button-div-container">
      <button onClick={toggleFilter}>
        {filterState === "all" ? "Показать только активных" : filterState === "active" ? "Показать только неактивных" : "Показать всех"}
      </button>
      <button onClick={SortByBalance}>
        Сортировать по балансу ({sortOrder === "asc" ? "по возрастанию" : "по убыванию"})
      </button>
      <button onClick={SortByEmail}>
        Сортировать по Email ({sortOrder === "asc" ? "по возрастанию" : "по убыванию"})
      </button></div>
      <table class="my-main-table">

        <tbody>
          <tr  style={{ transform: `translateX(0px)` }}>
            <td>Имя</td>
            <td>Email</td>
            <td>Баланс</td>
          </tr>

          {filteredData.map(item => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;