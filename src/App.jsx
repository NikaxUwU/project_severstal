import React from "react";
import Table from "./Table";
import data from './data.json'; 

{/* Тут просто загружаем данные из файла .json в компонент Table */}

const App = () => {
  return (
    <div className="body-main-div">
      <h1>Таблица данных</h1>
      <Table data={data} /> 
    </div>
  );
};

export default App;