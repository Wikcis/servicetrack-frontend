import React, { Fragment } from "react";
import { CustomCheckbox } from "../checkbox/CustomCheckbox";
import { IconButtonsContainer } from "../iconButton/IconButtonsContainer";

const checkBoxColumn = {
    Header: "",
    accessor: "checkBox",
    style: { width: "8%" },
    Cell: () => <CustomCheckbox />,
}
const phoneNumberColumn = {
    Header: "Phone number",
    accessor: "phoneNumber",
    style: { width: "12%" },
}

const emailColumn = {
    Header: "Email",
    accessor: "email",
    style: { width: "22%" },
}

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


export const createTechniciansColumns = (countServiceOrders, type, refreshTable) => [

    checkBoxColumn,
    {
        Header: "First Name",
        accessor: "firstName",
        style: { width: "15%" },
    },
    {
        Header: "Last Name",
        accessor: "lastName",
        style: { width: "20%" },
    },
    phoneNumberColumn,
    emailColumn,
    {
        Header: "Number of Services",
        accessor: "numberOfServices",
        style: { width: "10%" },
        Cell: ({ row }) => <Fragment>{countServiceOrders(row)}</Fragment>,
    },
    {
        Header: "",
        accessor: "edition",
        style: { width: "12%" },
        Cell: ({ row }) => <IconButtonsContainer type={type} row={row} refreshTable={refreshTable} />,
    },
];

export const createClientColumns = (countServiceOrders, type, refreshTable) => [
    {
        Header: "",
        accessor: "checkBox",
        style: { width: "8%" },
        Cell: () => <CustomCheckbox />,
    },
    {
        Header: "Name",
        accessor: "name",
        style: { width: "20%" },
    },
    phoneNumberColumn,
    emailColumn,
    {
        Header: "Service Formats",
        accessor: "serviceFormats",
        style: { width: "15%" },
        Cell: ({ row }) => <Fragment>{countServiceOrders(row)}</Fragment>,
    },
    {
        Header: "Number of Services",
        accessor: "numberOfServices",
        style: { width: "10%" },
        Cell: ({ row }) => <Fragment>{countServiceOrders(row)}</Fragment>,
    },
    {
        Header: "",
        accessor: "edition",
        style: { width: "12%" },
        Cell: ({ row }) => <IconButtonsContainer type={type} row={row} refreshTable={refreshTable} />,
    },
];

export const createServiceOrdersColumns = (countServiceOrders, type, refreshTable) => [
    {
        Header: "Client Name",
        accessor: "clientName",
        style: { width: "20%" },
    },
    {
        Header: "Type of Service",
        accessor: "serviceType",
        style: { width: "15%" },
    },
    {
        Header: "Service Format",
        accessor: "serviceFormat",
        style: { width: "12%" },
    },
    {
        Header: "Time of service",
        accessor: "dateTimeOfService",
        style: { width: "12%" },
        Cell: ({ row }) => (
            <Fragment>{formatDateTime(row.original.dateTimeOfService)}</Fragment>
        ),
    },
    {
        Header: "Status",
        accessor: "status",
        style: { width: "12%" },
    },
    {
        Header: "Duration of service",
        accessor: "serviceDuration",
        style: { width: "12%" },
    },
    {
        Header: "",
        accessor: "edition",
        style: { width: "8%" },
        Cell: ({ row }) => <IconButtonsContainer type={type} row={row} refreshTable={refreshTable} />,
    },
];
