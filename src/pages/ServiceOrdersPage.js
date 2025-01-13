import {
    CustomButton,
    DropDownList,
    Searchbar,
    ServiceOrderCreationPopup,
    Sidebar,
    Table,
    UserBar
} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {getClient, listServiceOrders} from "../services";
import {Format, mapAccessorToHeader, sortData, Status, Titles, Type} from "../utils";
import {TableColumns} from "../components/table/TableColumns";
import {PlusIcon} from "../assets";

export const ServiceOrdersPage = () => {

    const [serviceOrders, setServiceOrders] = useState([]);
    const [filteredServiceOrders, setFilteredServiceOrders] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.serviceOrdersPageTitle, () => refreshTable());

    useEffect(() => {
        const fetchServiceOrders = async () => {
            await refreshTable();
        };
        fetchServiceOrders();
    }, []);

    const refreshTable = async () => {
        try {
            const response = await listServiceOrders();
            const orders = response.data.serviceOrders || [];

            const ordersWithMappedValues = orders.map(order => ({
                ...order,
                serviceFormat: mapAccessorToHeader(order.serviceFormat, Format),
                status: mapAccessorToHeader(order.status, Status),
                serviceType: mapAccessorToHeader(order.serviceType, Type),
            }));

            const ordersWithClientNames = await fetchClientNames(ordersWithMappedValues);

            setServiceOrders(ordersWithClientNames);
            setFilteredServiceOrders(ordersWithClientNames);
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

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredServiceOrders, setFilteredServiceOrders);
    };

    return (
        <div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.serviceOrdersPageTitle}/>
                <div className="aboveTableContainer">
                    <DropDownList
                        columns={columns.filter(col => col.Header !== "")}
                        onSelectColumn={handleSelection}
                        title={Titles.sortByTitle}
                        className={"dropDownListContainer"}
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
                refreshTable={() => refreshTable()}
            />
        </div>

    );
};
