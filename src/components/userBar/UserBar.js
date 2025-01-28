import React, {Fragment, useContext, useEffect} from "react";
import {Title} from "../title/Title";
import {AppContext, REST_API_URLS} from "../../context";
import {ProfilePageIcon} from "../../assets";
import {useNavigate} from "react-router-dom";

export const UserBar = ({title}) => {

    const navigate = useNavigate();
    const {fetchUser, user} = useContext(AppContext);


    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="userBarContainer">
            <div className="userWithIconContainer">
                <div className="userInfoContainer">
                    <div className="userNameContainer">
                        <span>{user.firstName} {user.lastName}</span>
                    </div>
                    <Fragment>{user.phoneNumber}</Fragment>
                </div>
                <ProfilePageIcon
                    className="profileIcon"
                    onClick={() => navigate(REST_API_URLS.ONLY_PROFILE_URL)}
                />
            </div>
            <Title>{title}</Title>
        </div>
    )
};

