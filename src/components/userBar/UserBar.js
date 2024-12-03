import React, {Fragment} from "react";
import {Triangle} from "../../assets";
import {Title} from "../title/Title";

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
            <Title>{title}</Title>
        </div>
    )
};

