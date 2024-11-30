import React from "react";
import {IconButton, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils";
import {EditIcon} from "../../assets";

export const IconEditButton = ({ type, row }) => {

    const editItem = () => {

    }

    return (
        <ThemeProvider theme={Theme}>
            <IconButton size="small"
                        onClick={() => editItem}>
                <EditIcon/>
            </IconButton>
        </ThemeProvider>
    )
}