import {CustomButton, DropDownList, Searchbar, Sidebar, Table, Title, UserBar} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {getClient, listServiceOrders} from "../services";
import {sortData, Titles} from "../utils";
import {TableColumns} from "../components/table/TableColumns";

export const ServiceOrdersPage = () => {

    const [serviceOrders, setServiceOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredServiceOrders, setFilteredServiceOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const columns = TableColumns(Titles.serviceOrdersPageTitle, () => refreshTable());

    const refreshTable = async () => {
        try {
            setLoading(true);
            const response = await listServiceOrders();
            const orders = response.data.serviceOrders || [];
            const ordersWithClientNames = await fetchClientNames(orders);
            setServiceOrders(ordersWithClientNames);
            setLoading(false); // Loading complete
        } catch (err) {
            console.error("Error refreshing table:", err);
            setError("Failed to refresh table.");
            setLoading(false);
        }
    };

    const fetchClientNames = async (orders) => {
        return Promise.all(
            orders.map(async (order) => {
                try {
                    const clientResponse = await getClient(order.clientId);
                    return {
                        ...order,
                        clientName: clientResponse?.data?.name || "Unknown Client",
                    };
                } catch (err) {
                    console.error(`Error fetching client for order ID ${order.clientId}:`, err);
                    return {
                        ...order,
                        clientName: "Unknown Client",
                    };
                }
            })
        );
    };

    useEffect(() => {
        const search = searchInput === "" ? searchInput : searchInput.toLowerCase();
        setFilteredServiceOrders(
            serviceOrders.filter((serviceOrder) => {
                return (
                    serviceOrder.clientName.toLowerCase().includes(search) ||
                    serviceOrder.serviceType.toString().includes(search) ||
                    serviceOrder.serviceFormat.toLowerCase().includes(search) ||
                    serviceOrder.dateTimeOfService.toLowerCase().includes(search) ||
                    serviceOrder.status.toLowerCase().includes(search)
                );
            })
        );
    }, [searchInput, serviceOrders]);


    useEffect(() => {
        const fetchServiceOrders = async () => {
            try {
                const response = await listServiceOrders();
                const orders = response.data.serviceOrders || [];
                const ordersWithClientNames = await fetchClientNames(orders)
                setServiceOrders(ordersWithClientNames);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchServiceOrders();
    }, []);

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredServiceOrders, setFilteredServiceOrders);
    };

    if (loading) {
        return (
            <div className="sidebarContainer">
                <Sidebar/>
                <div className="container col py-3">
                    <h2 className="text-center">Loading...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sidebarContainer">
                <Sidebar/>
                <div className="container col py-3">
                    <h2 className="text-center text-danger">{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.serviceOrdersPageTitle}/>
                <div className="aboveTableContainer">
                    <Title>Your services</Title>
                    <DropDownList
                        columns={columns.map(col => col.Header)}
                        onSelectColumn={handleSelection}
                    />
                    <Searchbar onSearch={(input) => setSearchInput(input)}/>
                    <CustomButton className="addButton">
                        Add service order
                    </CustomButton>
                </div>
                <Table
                    data={filteredServiceOrders}
                    type={Titles.serviceOrdersPageTitle}
                    refreshTable={refreshTable}
                />
            </div>
        </div>

    );
};
