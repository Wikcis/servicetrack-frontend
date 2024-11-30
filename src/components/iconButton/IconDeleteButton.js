import React from "react";
import { IconButton, ThemeProvider } from "@mui/material";
import { Theme, Titles } from "../../utils";
import { BinIcon } from "../../assets";
import { deleteTechnician, deleteClient, deleteServiceOrder } from "../../services";

export const IconDeleteButton = ({ type, row, refreshTable }) => {

    const deleteItem = async () => {
        try {
            if (type === Titles.techniciansPageTitle) {
                await deleteTechnician(row.original.id);
            } else if (type === Titles.clientsPageTitle) {
                await deleteClient(row.original.id);
            } else if (type === Titles.serviceOrdersTitle) {
                await deleteServiceOrder(row.original.id);
            }
            console.log("Item deleted successfully");

            refreshTable();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <ThemeProvider theme={Theme}>
            <IconButton size="small" onClick={deleteItem}>
                <BinIcon />
            </IconButton>
        </ThemeProvider>
    );
};
