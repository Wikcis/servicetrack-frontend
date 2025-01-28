import {CustomButton, Sidebar, UserBar} from "../components";
import React, {useContext, useEffect, useState} from "react";
import "../styles";
import {Titles} from "../utils";
import "../components";
import {TimeRangePopup, ClientSelectionPopup} from "../components";
import {AppContext} from "../context";

export const ProfilePage = () => {

    const {fetchData} = useContext(AppContext);

    const [triggerButtonForTime, setTriggerButtonForTime] = useState(false);
    const [triggerButtonForClient, setTriggerButtonForClient] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app">
            <Sidebar/>
            <div className="mainContainer">
                <UserBar title={Titles.profileTitle}/>

                <CustomButton
                    className="addButton"
                    setTriggerButton={setTriggerButtonForTime}
                >
                    Generate Report in given time range
                </CustomButton>

                <CustomButton
                    className="addButton"
                    setTriggerButton={setTriggerButtonForClient}
                >
                    Generate Report for specific Client
                </CustomButton>

                <CustomButton
                    className="addButton"
                    type={Titles.logOutTitle}
                >
                    {Titles.logOutTitle}
                </CustomButton>

            </div>

            <TimeRangePopup
                triggerButton={triggerButtonForTime}
                setTriggerButton={setTriggerButtonForTime}
            />

            <ClientSelectionPopup
                triggerButton={triggerButtonForClient}
                setTriggerButton={setTriggerButtonForClient}
            />
        </div>
    );
};