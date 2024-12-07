import {CustomButton, DropDownList, Searchbar, Sidebar, Table, UserBar} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {listClients} from "../services";
import {sortData,Titles} from "../utils";
import {TableColumns} from "../components/table/TableColumns";

export const ClientsListPage = () => {

    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const columns = TableColumns(Titles.clientsPageTitle, () => refreshTable());

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await listClients();
                const data = response.data.clients || [];
                setClients(data);
                setFilteredClients(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch clients. Please try again later.");
                setLoading(false);
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
            setError("Failed to refresh table:", err);
        }
    };

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredClients, setFilteredClients);
    };

    if (loading) {
        return (
            <div className="sidebarContainer">
                <Sidebar />
                <div className="container col py-3">
                    <h2 className="text-center">Loading...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sidebarContainer">
                <Sidebar />
                <div className="container col py-3">
                    <h2 className="text-center text-danger">{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <Sidebar />
            <div className="mainContainer">
                <UserBar title={Titles.clientsPageTitle} />
                <div className="aboveTableContainer">
                    <DropDownList
                        columns={columns.map(col => col.Header)}
                        onSelectColumn={handleSelection}
                    />
                    <Searchbar onSearch={(input) => setSearchInput(input)} />
                    <CustomButton className="addButton">
                        Add client
                    </CustomButton>
                </div>
                <Table
                    data={filteredClients}
                    type={Titles.clientsPageTitle}
                    refreshTable={refreshTable}
                />
            </div>
        </div>
    );
};
