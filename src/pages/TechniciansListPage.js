import {CustomButton, DropDownList, Searchbar, Sidebar, Table, UserBar} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {listTechnicians} from "../services";
import {sortData, Titles} from "../utils";
import {TableColumns} from "../components/table/TableColumns";
import {PlusIcon} from "../assets";
import {TechnicianCreationPopup} from "../components/popup/TechnicianCreationPopup";

export const TechniciansListPage = () => {

    const [technicians, setTechnicians] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.techniciansPageTitle, () => refreshTable());

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await listTechnicians();
                const data = response.data.technicians || [];
                setTechnicians(data);
                setFilteredTechnicians(data);
            } catch (error) {
                console.error(error);
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
            console.log(err)
        }
    };

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredTechnicians, setFilteredTechnicians);
    };

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
                    <CustomButton
                        className="addButton"
                        icon={<PlusIcon/>}
                        setTriggerButton={setTriggerButton}
                    >
                        Add technician
                    </CustomButton>
                </div>
                <Table
                    data={filteredTechnicians}
                    type={Titles.techniciansPageTitle}
                    refreshTable={refreshTable}
                />
            </div>
            <TechnicianCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
                refreshTable={() => refreshTable()}
            />
        </div>

    );
};
