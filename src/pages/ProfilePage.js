import {CustomButton, Sidebar, UserBar} from "../components";
import React, {useState} from "react";
import "../styles";
import {Titles} from "../utils";
import "../components";
import {TimeRangePopup, ClientSelectionPopup} from "../components";

export const ProfilePage = () => {

    const [triggerButtonForTime, setTriggerButtonForTime] = useState(false);
    const [triggerButtonForClient, setTriggerButtonForClient] = useState(false);

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