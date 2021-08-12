import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { useTable } from "react-table";

import "./Table.css"

function Table({ columns, data, hiddenColumns }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenColumns
      }
    },
  );

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            // <TableRow {...row.getRowProps()}>
            <tr
            // {...row.getRowProps()} onClick={() => {
            //   setCurrShipmentId(row.original._id)
            //   setSingleShipmentShown(true)
            //   setCurrAreaCode(row.original.areaCode)
            //   setFulfilled(fulfilled)
            //   console.log(row.original._id)}}
            >
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </tr>
            // </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  );
}

export default Table;