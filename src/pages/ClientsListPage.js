import {ClientCreationPopup, CustomButton, DropDownList, Searchbar, Sidebar, Table, UserBar} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {listClients} from "../services";
import {sortData, Titles} from "../utils";
import "../components"
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
            try {
                const response = await listClients();
                const data = response.data.clients || [];
                setClients(data);
            } catch (error) {
                console.error(error);
            }
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
                    client.email.toLowerCase().includes(search)
                );
            })
        );
    }, [searchInput, clients]);

    const refreshTable = async () => {
        try {
            const response = await listClients();
            const data = response.data.clients || [];
            setClients(data);
            setFilteredClients(data);
        } catch (err) {
            console.log(err)
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
                        columns={columns.map(col => col.Header)}
                        onSelectColumn={handleSelection}
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
