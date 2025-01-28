import React from "react";
import {Button, ThemeProvider} from "@mui/material";
import {Theme, Titles} from "../../utils";
import {postMethod} from "../../services";
import {REST_API_URLS, token} from "../../api/apiConstants";
import {deleteSecureItem} from "../../api/apiFunctions";
import {useNavigate} from "react-router-dom";

export const CustomButton = ({ children, className, setTriggerButton, icon, requestBody, type, generateCSV = () => [], data = () => [], credentials = () => []}) => {

    const navigate = useNavigate();

    const handleClick = async () => {

        if (requestBody) {
            const requestData = requestBody();

            if(!requestData) {
                return null
            }

            switch (type) {
                case Titles.techniciansPageTitle:
                    await postMethod(REST_API_URLS.TECHNICIANS_URL, requestData);
                    break;
                case Titles.clientsPageTitle:
                    await postMethod(REST_API_URLS.CLIENTS_URL, requestData);
                    break;
                case Titles.serviceOrdersPageTitle:
                    await postMethod(REST_API_URLS.SERVICEORDERS_URL, requestData);
                    break;
                default:
                    break;
            }
        } else if (type === Titles.profileTitle) {
            const tmp = data();
            generateCSV(tmp);
        } else if (type === Titles.loginTitle || type === Titles.registerTitle) {
            credentials();
            return;
        } else if (type === Titles.logOutTitle) {
            await deleteSecureItem(token)
            navigate(REST_API_URLS.ONLY_LOGIN_URL);
            return;
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
