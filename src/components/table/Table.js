import React, {Fragment} from "react";
import {useTable} from "react-table";
import {CustomCheckbox} from "../checkbox/CustomCheckbox"
import {IconButtonsContainer} from "../iconButton/IconButtonsContainer";

export const Table = ({data, serviceOrders}) => {

    const countServiceOrders = React.useCallback((row) => {
        const technicianId = row.original.id;
        return serviceOrders.filter((serviceOrder) => serviceOrder.technicianId === technicianId).length;
    }, [serviceOrders]);

    const columns = React.useMemo(() => [
        {
            Header: "",
            accessor: "checkBox",
            style: {width: "8%"},
            Cell: () => <CustomCheckbox/>
        },
        {
            Header: "First Name",
            accessor: "firstName",
            style: {width: "15%"},
        },
        {
            Header: "Last Name",
            accessor: "lastName",
            style: {width: "20%"},
        },
        {
            Header: "Phone number",
            accessor: "phoneNumber",
            style: {width: "12%"},
        },
        {
            Header: "Email",
            accessor: "email",
            style: {width: "22%"},
        },
        {
            Header: "Number of Services",
            accessor: "numberOfServices",
            style: {width: "10%"},
            Cell: ({row}) => (
                <Fragment>
                    {countServiceOrders(row)}
                </Fragment>
            )
        },
        {
            Header: "",
            accessor: "edition",
            style: {width: "12%"},
            Cell: () => <IconButtonsContainer/>
        },
    ], [countServiceOrders]);

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