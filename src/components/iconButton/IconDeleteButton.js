import React, {useContext} from "react";
import {IconButton, ThemeProvider} from "@mui/material";
import {Theme, Titles} from "../../utils";
import {BinIcon} from "../../assets";
import {deleteTechnician, deleteClient, deleteServiceOrder} from "../../services";
import {ApiContext} from "../../context";

export const IconDeleteButton = ({type, row}) => {

    const {refreshClients, refreshTechnicians, refreshServiceOrders} = useContext(ApiContext);

    const deleteItem = async () => {
        try {
            if (type === Titles.techniciansPageTitle) {
                await deleteTechnician(row.original.id);
                refreshTechnicians();
            } else if (type === Titles.clientsPageTitle) {
                await deleteClient(row.original.id);
                refreshClients();
            } else if (type === Titles.serviceOrdersPageTitle) {
                await deleteServiceOrder(row.original.id);
                refreshServiceOrders();
            }
            console.log("Item deleted successfully: ");
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <ThemeProvider theme={Theme}>
            <IconButton size="small" onClick={deleteItem}>
                <BinIcon/>
            </IconButton>
        </ThemeProvider>
    );
};
