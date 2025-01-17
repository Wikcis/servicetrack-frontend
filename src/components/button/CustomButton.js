import React from "react";
import {Button, ThemeProvider} from "@mui/material";
import {Theme, Titles} from "../../utils";
import {addClient, addServiceOrder, addTechnician} from "../../services";

export const CustomButton = ({ children, className, setTriggerButton, icon, requestBody, type, generateCSV = () => [], data = () => [] }) => {

    const handleClick = async () => {

        if (requestBody) {
            const requestData = requestBody();

            if(!requestData) {
                return null
            }

            switch (type) {
                case Titles.techniciansPageTitle:
                    addTechnician(requestData);
                    break;
                case Titles.clientsPageTitle:
                    addClient(requestData);
                    break;
                case Titles.serviceOrdersPageTitle:
                    addServiceOrder(requestData);
                    break;
                default:
                    break;
            }
        } else if (typeof data === "function") {
            const tmp = data();

            generateCSV(tmp);
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
