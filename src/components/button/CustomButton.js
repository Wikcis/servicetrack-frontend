import React from "react";
import {Button, ThemeProvider} from "@mui/material";
import {PlusIcon} from "../../assets";
import {Theme} from "../../utils";

export const CustomButton = ( { children, className } ) => {

    return (
        <ThemeProvider theme={Theme}>
            <Button className={className}
                    variant="contained"
                    startIcon={<PlusIcon />}
                    color="primary"
            >
                {children}
            </Button>
        </ThemeProvider>

    )
}