import React from "react";
import {useTable} from "react-table";

export const Table = ({data}) => {

    const columns = React.useMemo(() => [
        {Header: "First Name", accessor: "firstName"},
        {Header: "Last Name", accessor: "lastName"},
        {Header: "Phone number", accessor: "phoneNumber"},
        {Header: "Email", accessor: "email"},
    ], []);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});

    return (
        <div className="tableContainer">
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} key={column.id}>
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
                            {row.cells.map(cell => (
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