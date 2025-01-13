import {CustomButton, DropDownList, Searchbar, Sidebar, Table, TechnicianCreationPopup, UserBar} from "../components"
import React, {useEffect, useState} from "react";
import "../styles"
import {listServiceOrders, listTechnicians} from "../services";
import {sortData, Titles} from "../utils";
import {TableColumns} from "../components/table/TableColumns";
import {PlusIcon} from "../assets";

export const TechniciansListPage = () => {

    const [technicians, setTechnicians] = useState([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.techniciansPageTitle, () => refreshTable());

    useEffect(() => {
        const fetchTechnicians = async () => {
            refreshTable();
        };
        fetchTechnicians();
    }, []);

    useEffect(() => {
        const search = searchInput === "" ? searchInput : searchInput.toLowerCase();
        setFilteredTechnicians(technicians.filter((technician) => {
            return (technician.firstName.toLowerCase().includes(search) || technician.lastName.toLowerCase().includes(search) || technician.phoneNumber.toString().includes(search) || technician.email.toLowerCase().includes(search));
        }));
    }, [searchInput, technicians]);

    const refreshTable = async () => {
        try {
            const serviceOrdersResponse = await listServiceOrders();
            const serviceOrdersData = serviceOrdersResponse.data.serviceOrders || [];

            const techniciansResponse = await listTechnicians();
            const techniciansData = techniciansResponse.data.technicians || [];
            const techniciansWithAdditionalData = techniciansData.map(technician => {
                const technicianOrders = serviceOrdersData.filter(order => order.technicianId === technician.id);

                return {
                    ...technician, numberOfServices: technicianOrders.length,
                };
            });

            setTechnicians(techniciansWithAdditionalData);
            setFilteredTechnicians(techniciansWithAdditionalData);
        } catch (err) {
            console.log("Error refreshing table:", err);
        }
    };

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredTechnicians, setFilteredTechnicians);
    };

    return (<div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.techniciansPageTitle}/>
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
