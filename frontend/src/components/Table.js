import React, { useMemo } from "react";
import dataHandler from "../services/dataHandler";
import { useState, useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";

import { COLUMNS } from "./columns";
import { GlobalFilterDebouncing } from "./GlobalFilterDebouncing";

//ui
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Table = () => {
  const urlHistorial = "http://localhost:3001/historial";
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    dataHandler.getAll(urlHistorial).then((values) => {
      setJsonData(values);
    });
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => jsonData, [jsonData]);

  const tableInstance = useTable(
    { columns: columns, data: data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div className="col-md-10">
        <GlobalFilterDebouncing
          filter={globalFilter}
          setFilter={setGlobalFilter}
          tableName="Historial"
        />

        <table
          {...getTableProps()}
          className="table table-dark table-striped table-hover mb-0"
        >
          <thead className="text_gold">
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={i}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <IoIosArrowDown className="ms-1" />
                        ) : (
                          <IoIosArrowUp className="ms-1" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, i) => {
                    return <td key={i}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-center ">
          <span className="d-flex align-items-center me-1">
            Pagina{" "}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            className="btn btn-sm btn-outline-dark me-1"
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            Anterior
          </button>
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
