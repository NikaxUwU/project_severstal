import React from "react";
import Table from "./Table";
import data from './data.json'; 

const App = () => {
  return (
    <div>
      <h1>Таблица данных</h1>
      <Table data={data} />
    </div>
  );
};

export default App;