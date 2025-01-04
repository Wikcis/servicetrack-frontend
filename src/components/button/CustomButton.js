import React from "react";
import { Button, ThemeProvider } from "@mui/material";
import {Theme, Titles} from "../../utils";
import {addClient, addServiceOrder, addTechnician} from "../../services";

export const CustomButton = ({ children, className, setTriggerButton, icon, requestBody, type }) => {

    const handleClick = async () => {
        if (requestBody) {
            const requestData = requestBody();
            console.log(requestData);
            switch (type) {
                case Titles.techniciansPageTitle:
                    return addTechnician(requestData);
                case Titles.clientsPageTitle:
                    return addClient(requestData);
                case Titles.serviceOrdersPageTitle:
                    return addServiceOrder(requestData);
                default:
                    return null;
            }
        }

        setTriggerButton((prev) => !prev);
    };

    return (
        <ThemeProvider theme={Theme}>
            <Button
                className={className}
                variant="contained"
                startIcon={icon}
                color="primary"
                onClick={handleClick}
            >
                {children}
            </Button>
        </ThemeProvider>
    );
};
