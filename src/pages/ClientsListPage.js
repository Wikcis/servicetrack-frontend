import {ClientCreationPopup, CustomButton, DropDownList, Searchbar, Sidebar, Table, UserBar} from "../components";
import React, {useContext, useEffect, useState} from "react";
import "../styles";
import {sortData, Titles} from "../utils";
import "../components";
import {TableColumns} from "../components";
import {PlusIcon} from "../assets";
import {AppContext} from "../context";

export const ClientsListPage = () => {

    const { fetchData ,searchClients, filteredClients, setFilteredClients, loading} = useContext(AppContext);

    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.clientsPageTitle);

    const handleSelection = (columnName) => {
        sortData(columnName, columns, filteredClients, setFilteredClients);
    };

    useEffect(() => {
        fetchData();
    }, []);

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

