import React from "react";
import {useTable} from "react-table";
import {createClientColumns, createServiceOrdersColumns, createTechniciansColumns} from "./TableColumns";
import {Titles} from "../../utils";

export const Table = ({data, serviceOrders, type, refreshTable}) => {

    const countServiceOrders = React.useCallback(
        (row) => {
            const id = row.original.id;
            if (type === Titles.techniciansPageTitle) {
                return serviceOrders.filter((order) => order.technicianId === id).length;
            } else if (type === Titles.clientsPageTitle) {
                return serviceOrders.filter((order) => order.clientId === id).length;
            }
            return 0;
        },
        [serviceOrders, type]
    );

    const columns = React.useMemo(() => {
        if (type === Titles.techniciansPageTitle) {
            return createTechniciansColumns(countServiceOrders, type, refreshTable);
        } else if (type === Titles.clientsPageTitle) {
            return createClientColumns(countServiceOrders, type, refreshTable);
        } else if (type === Titles.serviceOrdersPageTitle) {
            return createServiceOrdersColumns(type, refreshTable);
        }
    }, [countServiceOrders, type, refreshTable]);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});
    return (
        <div className="tableContainer">
            <table {...getTableProps()} key={getTableProps.id}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} key={column.id} style={column.style}>
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