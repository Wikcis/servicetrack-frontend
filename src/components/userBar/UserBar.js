import React from "react";
import {Triangle} from "../../assets";

export const UserBar = () => {

    return (
        <div className="userBarContainer">
            <div className="userInfoContainer">
                <div className="userNameContainer">
                    <text>
                        Name
                    </text>
                    <Triangle/>
                </div>
                <text>123123123</text>
            </div>
            <div className="contentNameContainer">
                <text>All Technicians</text>
                <hr className="contentNameLine"/>
            </div>
        </div>
    )
};

