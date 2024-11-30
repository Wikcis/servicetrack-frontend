import React, {Fragment} from "react";
import {Triangle} from "../../assets";

export const UserBar = ({title}) => {

    return (
        <div className="userBarContainer">
            <div className="userInfoContainer">
                <div className="userNameContainer">
                    <span>Name</span>
                    <Triangle/>
                </div>
                <Fragment>123123123</Fragment>
            </div>
            <div className="contentNameContainer">
                <span>All {title}</span>
                <hr className="contentNameLine"/>
            </div>
        </div>
    )
};

