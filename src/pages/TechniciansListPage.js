import {CustomButton, DropDownList, Searchbar, Sidebar, Table, UserBar} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {listTechnicians} from "../services";
import {sortData, Titles} from "../utils";
import {TableColumns} from "../components/table/TableColumns";

export const TechniciansListPage = () => {

    const [technicians, setTechnicians] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const columns = TableColumns(Titles.techniciansPageTitle, () => refreshTable());

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await listTechnicians();
                const data = response.data.technicians || [];
                setTechnicians(data);
                setFilteredTechnicians(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch technicians. Please try again later.");
                setLoading(false);
            }
        };
        fetchTechnicians();
    }, []);

    useEffect(() => {
        const search = searchInput === "" ? searchInput : searchInput.toLowerCase();
        setFilteredTechnicians(
            technicians.filter((technician) => {
                return (
                    technician.firstName.toLowerCase().includes(search) ||
                    technician.lastName.toLowerCase().includes(search) ||
                    technician.phoneNumber.toString().includes(search) ||
                    technician.email.toLowerCase().includes(search)
                );
            })
        );
    }, [searchInput, technicians]);

    const refreshTable = async () => {
        try {
            const response = await listTechnicians();
            const data = response.data.technicians || [];
            setTechnicians(data);
            setFilteredTechnicians(data);
        } catch (err) {
            setError("Failed to refresh table:", err);
        }
    };

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredTechnicians, setFilteredTechnicians);
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
                <UserBar title={Titles.techniciansPageTitle}/>
                <div className="aboveTableContainer">
                    <DropDownList
                        columns={columns.map(col => col.Header)}
                        onSelectColumn={handleSelection}
                    />
                    <Searchbar onSearch={(input) => setSearchInput(input)}/>
                    <CustomButton className="addButton">
                        Add technician
                    </CustomButton>
                </div>
                <Table
                    data={filteredTechnicians}
                    type={Titles.techniciansPageTitle}
                    refreshTable={refreshTable}
                />
            </div>
        </div>

    );
};
