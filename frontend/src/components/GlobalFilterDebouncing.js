import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilterDebouncing = (props) => {
  const { filter, setFilter, tableName } = props;
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 300);
  return (
    <div className="d-flex justify-content-end my-1">
      <span className="me-auto fw-bolder h3"> {tableName || ""}</span>
      <span className="p-2 bg_darkHeavyMetal text_gold rounded_10 me-1">
        Buscar
      </span>
      <input
        value={value || ""}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        className="rounded_10 border-1 "
      />{" "}
    </div>
  );
};
