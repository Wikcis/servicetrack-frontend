import {CustomButton, DropDownList, Searchbar, Sidebar, Table, TechnicianCreationPopup, UserBar} from "../components"
import React, {useContext, useEffect, useState} from "react";
import "../styles"
import {sortData, Titles} from "../utils";
import {TableColumns} from "../components";
import {PlusIcon} from "../assets";
import {AppContext} from "../context";

export const TechniciansListPage = () => {

    const {filteredTechnicians, setFilteredTechnicians, loading, searchTechnicians, fetchData} = useContext(AppContext);

    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.techniciansPageTitle);

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredTechnicians, setFilteredTechnicians);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                    <Searchbar onSearch={(input) => searchTechnicians(input)}/>
                    <CustomButton
                        className="addButton"
                        icon={<PlusIcon/>}
                        setTriggerButton={setTriggerButton}
                    >
                        Add technician
                    </CustomButton>
                </div>
                {!loading ? (
                    <Table
                        data={filteredTechnicians || []}
                        type={Titles.techniciansPageTitle}
                    />
                ) : null}
            </div>
            <TechnicianCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
            />
        </div>

    );
};
