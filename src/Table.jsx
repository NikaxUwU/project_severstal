import React, { useState } from "react";
import Row from "./Row";
import { buildTree } from "./DataTree";
import { filterData } from "./filterData";

const Table = ({data}) => {
  const [filterState, setFilterState] = useState("all"); 
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  {/* если пользователь нажал на кнопку сортировки, то сортируем, смотрим на то что выбрал пользователь :/ */}

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

  {/* Простенькие функции для изменения значений при нажатии на кнопки фильтрации */}

  const SortByBalance = () => {
    setSortBy("balance");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); 
  };
  
  const SortByEmail = () => {
    setSortBy("email");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };  

  const treeData = buildTree(sortData(data));

  {/* Такое же переключение но для фильтра с активностью */}

  const toggleFilter = () => {
    if (filterState === "all") {
      setFilterState("active");
    } else if (filterState === "active") {
      setFilterState("inactive");
    } else {
      setFilterState("all");
    }
  };

  const filteredData = filterData(treeData, filterState); {/* Тут пользуюсь фильтрацией из другого файла, убираю ненужные значения по активности, если такие имеются */}
  
  {/* Создаю кнопки и таблицу, передаю все отсортированные данные */}

  return (
    <div>
      <div className="button-div-container">
      <button onClick={toggleFilter}>
        {filterState === "all" ? "Показать только активных" : filterState === "active" ? "Показать только неактивных" : "Показать всех"}
      </button>
      <button onClick={SortByBalance}>
        Сортировать по балансу ({sortOrder === "asc" ? "по возрастанию" : "по убыванию"})
      </button>
      <button onClick={SortByEmail}>
        Сортировать по Email ({sortOrder === "asc" ? "по возрастанию" : "по убыванию"})
      </button></div>
      <table className="my-main-table">
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