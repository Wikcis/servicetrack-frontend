import {CustomIconButton} from "./CustomIconButton";
import {BinIcon, EditIcon} from "../../assets";
import React from "react";

export const IconButtonsContainer = () => {
    return (
        <div className="iconButton">
            <CustomIconButton>
                <EditIcon/>
            </CustomIconButton>

            <CustomIconButton>
                <BinIcon/>
            </CustomIconButton>
        </div>
    )
}
