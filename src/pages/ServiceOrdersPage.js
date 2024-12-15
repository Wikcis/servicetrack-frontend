import {
    CustomButton,
    DropDownList,
    Searchbar,
    ServiceOrderCreationPopup,
    Sidebar,
    Table,
    Title,
    UserBar
} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {getClient, listServiceOrders} from "../services";
import {sortData, Titles} from "../utils";
import {TableColumns} from "../components/table/TableColumns";
import {PlusIcon} from "../assets";

export const ServiceOrdersPage = () => {

    const [serviceOrders, setServiceOrders] = useState([]);
    const [filteredServiceOrders, setFilteredServiceOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.serviceOrdersPageTitle, () => refreshTable());

    const refreshTable = async () => {
        try {
            const response = await listServiceOrders();
            const orders = response.data.serviceOrders || [];
            const ordersWithClientNames = await fetchClientNames(orders);
            setServiceOrders(ordersWithClientNames);
        } catch (err) {
            console.error("Error refreshing table:", err);
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
            } catch (error) {
                console.error(error);
            }
        };
        fetchServiceOrders();
    }, []);

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredServiceOrders, setFilteredServiceOrders);
    };

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
                    <CustomButton
                        className="addButton"
                        icon={<PlusIcon/>}
                        setTriggerButton={setTriggerButton}
                    >
                        Add service order
                    </CustomButton>
                </div>
                <Table
                    data={filteredServiceOrders}
                    type={Titles.serviceOrdersPageTitle}
                    refreshTable={refreshTable}
                />
            </div>

            <ServiceOrderCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
            />
        </div>

    );
};
