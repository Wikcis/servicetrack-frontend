import React, {Fragment, useEffect, useState} from "react";
import {CustomCheckbox} from "../checkbox/CustomCheckbox";
import {EditDeleteIconButtonsContainer} from "../iconButton/EditDeleteIconButtonsContainer";
import {Format, mapAccessorToHeader, Titles} from "../../utils";
import {listServiceOrders} from "../../services";

const checkBoxColumn = {
    Header: "",
    accessor: "checkBox",
    style: {width: "8%"},
    Cell: () => <CustomCheckbox/>,
}
const phoneNumberColumn = {
    Header: "Phone number",
    accessor: "phoneNumber",
    style: {width: "12%"},
}

const emailColumn = {
    Header: "Email",
    accessor: "email",
    style: {width: "22%"},
}

const createTechniciansColumns = (countServiceOrders, type, refreshTable) => [

    checkBoxColumn,
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
    phoneNumberColumn,
    emailColumn,
    {
        Header: "Number of Services",
        accessor: "numberOfServices",
        style: {width: "10%"},
    },
    {
        Header: "",
        accessor: "edition",
        style: {width: "12%"},
        Cell: ({row}) => <EditDeleteIconButtonsContainer type={type} row={row} refreshTable={refreshTable}/>,
    },
];

const createClientColumns = (countServiceOrders, selectServiceOrdersFormat, type, refreshTable) => [
    {
        Header: "",
        accessor: "checkBox",
        style: {width: "8%"},
        Cell: () => <CustomCheckbox/>,
    },
    {
        Header: "Name",
        accessor: "name",
        style: {width: "20%"},
    },
    phoneNumberColumn,
    emailColumn,
    {
        Header: "Service Formats",
        accessor: "serviceFormats",
        style: {width: "15%"},
    },
    {
        Header: "Number of Services",
        accessor: "numberOfServices",
        style: {width: "10%"},
    },
    {
        Header: "",
        accessor: "edition",
        style: {width: "12%"},
        Cell: ({row}) => (
            <EditDeleteIconButtonsContainer type={type} row={row} refreshTable={refreshTable}/>
        ),
    },
];

const createServiceOrdersColumns = (type, refreshTable) => [
    {
        Header: "Client Name",
        accessor: "clientName",
        style: {width: "15%"},
    },
    {
        Header: "Type of Service",
        accessor: "serviceType",
        style: {width: "15%"},
    },
    {
        Header: "Service Format",
        accessor: "serviceFormat",
        style: {width: "12%"},
    },
    {
        Header: "Time of service",
        accessor: "dateTimeOfService",
        style: {width: "15%"},
        Cell: ({row}) => (
            <Fragment>{formatDateTime(row.original.dateTimeOfService)}</Fragment>
        ),
    },
    {
        Header: "Status",
        accessor: "status",
        style: {width: "12%"},
    },
    {
        Header: "Duration of service",
        accessor: "serviceDuration",
        style: {width: "12%"},
    },
    {
        Header: "",
        accessor: "edition",
        style: {width: "8%"},
        Cell: ({row}) => <EditDeleteIconButtonsContainer type={type} row={row} refreshTable={refreshTable}/>
    },
];

const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    try {
        const date = new Date(dateTime);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(date);
    } catch {
        return "Invalid Date";
    }
};


export const TableColumns = (type, refreshTable) => {

    const [serviceOrders, setServiceOrders] = useState([]);

    useEffect(() => {
        const fetchServiceOrders = async () => {
            try {
                const response = await listServiceOrders();
                const orders = response.data.serviceOrders || [];
                setServiceOrders(orders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchServiceOrders();
    }, []);

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

    const selectServiceOrdersFormats = React.useCallback(
        (row) => {
            const id = row.original.id;
            const uniqueFormats = Array.from(
                new Set(
                    serviceOrders
                        .filter((order) => order.clientId === id)
                        .map((order) => mapAccessorToHeader(order.serviceFormat, Format))
                )
            );
            return uniqueFormats.join(", ");
        },
        [serviceOrders]
    );

    return React.useMemo(() => {
        switch (type) {
            case Titles.techniciansPageTitle:
                return createTechniciansColumns(countServiceOrders, type, refreshTable);
            case Titles.clientsPageTitle:
                return createClientColumns(countServiceOrders, selectServiceOrdersFormats, type, refreshTable);
            case Titles.serviceOrdersPageTitle:
                return createServiceOrdersColumns(type, refreshTable);
            default:
                return [];
        }
    }, [countServiceOrders, selectServiceOrdersFormats, type, refreshTable]);
}


