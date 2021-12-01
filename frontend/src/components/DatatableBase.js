import React from 'react'
import DataTable from 'react-data-table-component'

const paginationOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}

function DatatableBase(props) {

    return (
 
        <DataTable                
            pagination /* Agrega paginación a la tabla */
            paginationComponentOptions = {paginationOptions} /* Traducir textos de la paginación */
            selectableRows   /* Agrega selectores de filas */
            fixedHeader /* Fija el Header de la tabla */
            fixedHeaderScrollHeight = "400px" /* Altura maxima de la tabla */
            highlightOnHover /* oscurece la fila al pasar el mouse */
            striped /* color de filas intercaladas */            
            selectableRowsHighlight /* cambia el color de la fila al seleccionarla */
            selectableRowsVisibleOnly /* selecciona las filas que esta visibles en el momento */
            {...props}
        />
 
    )
}

export default DatatableBase;
