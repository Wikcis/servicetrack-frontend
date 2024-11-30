import React from "react";
import {IconEditButton} from "./IconEditButton";
import {IconDeleteButton} from "./IconDeleteButton";

export const IconButtonsContainer = ({ type, row, refreshTable }) => {

    return (
        <div className="iconButton">
            <IconEditButton type={type} row={row} refreshTable={refreshTable} />
            <IconDeleteButton type={type} row={row} refreshTable={refreshTable}/>
        </div>
    )
}
