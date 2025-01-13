import {ClientCreationPopup, CustomButton, DropDownList, Searchbar, Sidebar, Table, UserBar} from "../components";
import React, {useEffect, useState} from "react";
import "../styles";
import {listClients, listServiceOrders} from "../services";
import {Format, mapAccessorToHeader, sortData, Titles} from "../utils";
import "../components";
import {TableColumns} from "../components/table/TableColumns";
import {PlusIcon} from "../assets";

export const ClientsListPage = () => {

    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.clientsPageTitle, () => refreshTable());

    useEffect(() => {
        const fetchClients = async () => {
            await refreshTable();
        };
        fetchClients();
    }, []);

    useEffect(() => {
        const search = searchInput === "" ? searchInput : searchInput.toLowerCase();
        setFilteredClients(
            clients.filter((client) => {
                return (
                    client.name.toLowerCase().includes(search) ||
                    client.phoneNumber.toString().includes(search) ||
                    client.email.toLowerCase().includes(search) ||
                    client.serviceFormats.toLowerCase().includes(search)
                );
            })
        );
    }, [searchInput, clients]);

    const refreshTable = async () => {
        try {
            const serviceOrdersResponse = await listServiceOrders();
            const serviceOrdersData = serviceOrdersResponse.data.serviceOrders || [];

            const clientsResponse = await listClients();
            const clientsData = clientsResponse.data.clients || [];
            const clientsWithAdditionalData = clientsData.map(client => {
                const clientOrders = serviceOrdersData.filter(order => order.clientId === client.id);

                const distinctServiceFormats = Array.from(
                    new Set(
                        clientOrders.map(order =>
                            mapAccessorToHeader(order.serviceFormat, Format)
                        )
                    )
                ).join(", ");

                return {
                    ...client,
                    numberOfServices: clientOrders.length,
                    serviceFormats: distinctServiceFormats || "",
                };
            });

            setClients(clientsWithAdditionalData);
            setFilteredClients(clientsWithAdditionalData);
        } catch (err) {
            console.log("Error refreshing table:", err);
        }
    };

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredClients, setFilteredClients);
    };

    return (
        <div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.clientsPageTitle}/>
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
                        Add client
                    </CustomButton>
                </div>
                <Table
                    data={filteredClients}
                    type={Titles.clientsPageTitle}
                    refreshTable={refreshTable}
                />
            </div>
            <ClientCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
                refreshTable={() => refreshTable()}
            />
        </div>
    );
};
