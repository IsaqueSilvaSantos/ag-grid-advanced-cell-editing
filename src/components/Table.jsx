import { React, useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import CellRenderer from "./CellRenderer";

const Table = () => {
  let [rowData, setRowData] = useState();

  let [columnDefs] = useState([
    { headerName: "ID", field: "id", cellRenderer: CellRenderer },
    { headerName: "Completed", field: "completed" },
    { headerName: "Title", field: "title" },
  ]);

  let defaultColDef = useMemo(() => {
    return {
      editable: true,
      flex: 1,
    };
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div>
      <div className="ag-theme-alpine" style={{ width: 850, height: 600 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} pagination={true} />
      </div>
    </div>
  );
};

export default Table;
