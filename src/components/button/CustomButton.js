import React from "react";
import { Button, ThemeProvider } from "@mui/material";
import { Theme } from "../../utils";

export const CustomButton = ({ children, className, setTriggerButton, icon }) => {

    const handleClick = () => {
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
