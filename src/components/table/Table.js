import React from "react";
import {useTable} from "react-table";
import {TableColumns} from "./TableColumns";

export const Table = ({data, type, refreshTable}) => {
    const columns = TableColumns(type, refreshTable);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});
    return (
        <div className="tableContainer">
            <table {...getTableProps()} key={getTableProps.id}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}
                                key={column.id}
                                style={column.style}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} key={cell.column.id}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}