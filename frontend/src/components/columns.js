import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "IdUser",
    accessor: "idUser",
  },
  {
    Header: "Victoria",
    accessor: "victoria",
    Cell: ({ value }) => {
      return value ? "Ganador" : "Derrota";
    },
  },
  {
    Header: "Apuesta",
    accessor: "apuesta",
  },
  {
    Header: "Ganador",
    accessor: "ganador",
  },
  {
    Header: "Fecha",
    accessor: "fecha",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Ganancia",
    accessor: "ganancia",
    cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
  {
    Header: "Perdida",
    accessor: "perdida",
    cell: ({ value }) => {
      return value.toFixed(2);
    },
  },
];
