import React from "react";
import Table from "../components/Table";
import Navbar from "../components/Navbar";

export const Historial = () => {
  return (
    <>
      <Navbar />
      <div className="row d-flex justify-content-center">
        <Table />
      </div>
    </>
  );
};
