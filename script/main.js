let gridOptions = {};

/**
 * It takes a callback function as an argument and then calls that callback function with the data it
 * gets from the ajax request.
 * @param cb - callback function
 */
const GET_DATA = (cb) => {
  $.ajax("https://jsonplaceholder.typicode.com/todos/", {
    success(data) {
      cb(data);
    },
  });
};

GET_DATA((data) => {
  gridOptions = {
    columnDefs: [
      { headerName: "ID", field: "id", cellRenderer: modalRenderer },
      { headerName: "Completed", field: "completed" },
      { headerName: "Title", field: "title" },
    ],
    defaultColDef: {
      sortable: true,
      flex: 1,
    },
    rowData: data,
    pagination: true,
    animateRows: true,
  };

  let gridDiv = document.querySelector("#myGrid");
  gridDiv.style.height = "600px";
  new agGrid.Grid(gridDiv, gridOptions);
});
