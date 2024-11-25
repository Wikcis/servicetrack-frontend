import React from "react";
import {IconButton, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils";

export const CustomIconButton = ({children}) => {

    return (
        <ThemeProvider theme={Theme}>
            <IconButton size="small">
                {children}
            </IconButton>
        </ThemeProvider>
    )
}