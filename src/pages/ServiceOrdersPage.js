import {CustomButton, DropDownList, Searchbar, ServiceOrderCreationPopup, Sidebar, Table, UserBar} from "../components"
import React, {useContext, useState} from "react";
import "../styles"
import {sortData, Titles} from "../utils";
import {TableColumns} from "../components/table/TableColumns";
import {PlusIcon} from "../assets";
import {ApiContext} from "../context";

export const ServiceOrdersPage = () => {

    const {filteredServiceOrders, setFilteredServiceOrders, searchServiceOrders, loading } = useContext(ApiContext);

    const [triggerButton, setTriggerButton] = useState(false);

    const columns = TableColumns(Titles.serviceOrdersPageTitle);

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
                    <Searchbar onSearch={(input) => searchServiceOrders(input)}/>
                    <CustomButton
                        className="addButton"
                        icon={<PlusIcon/>}
                        setTriggerButton={setTriggerButton}
                    >
                        Add service order
                    </CustomButton>
                </div>
                {!loading ? (
                    <Table
                        data={filteredServiceOrders}
                        type={Titles.serviceOrdersPageTitle}
                    />
                ) : null}
            </div>

            <ServiceOrderCreationPopup
                triggerButton={triggerButton}
                setTriggerButton={setTriggerButton}
            />
        </div>

    );
};
