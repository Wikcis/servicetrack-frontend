import React, {Fragment} from "react";
import {Triangle} from "../../assets";

export const UserBar = () => {

    return (
        <div className="userBarContainer">
            <div className="userInfoContainer">
                <div className="userNameContainer">
                    <Fragment>
                        Name
                    </Fragment>
                    <Triangle/>
                </div>
                <Fragment>123123123</Fragment>
            </div>
            <div className="contentNameContainer">
                <Fragment>All Technicians</Fragment>
                <hr className="contentNameLine"/>
            </div>
        </div>
    )
};

