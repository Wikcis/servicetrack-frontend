import {ClientCreationPopup, CustomButton, DropDownList, Searchbar, Sidebar, Table, UserBar} from "../components";
import React, {useContext, useState} from "react";
import "../styles";
import {sortData, Titles} from "../utils";
import "../components";
import {TableColumns} from "../components";
import {PlusIcon} from "../assets";
import {ApiContext} from "../context";

export const ClientsListPage = () => {

    const {searchClients, filteredClients, setFilteredClients, loading} = useContext(ApiContext);

    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.clientsPageTitle);

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
                    <Searchbar onSearch={(input) => searchClients(input)}/>
                    <CustomButton
                        className="addButton"
                        icon={<PlusIcon/>}
                        setTriggerButton={setTriggerButton}
                    >
                        Add client
                    </CustomButton>
                </div>
                {!loading ? (
                    <Table
                        data={filteredClients || []}
                        type={Titles.clientsPageTitle}
                    />
                ) : null}
            </div>
            <ClientCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
            />
        </div>
    );
};

