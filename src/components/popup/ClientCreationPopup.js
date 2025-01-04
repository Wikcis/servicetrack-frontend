import Popup from "reactjs-popup";
import {CustomTextField} from "../textField/CustomTextField";
import {CustomButton} from "../button/CustomButton";
import {IconXButton} from "../iconButton/IconXButton";
import React, {useEffect} from "react";
import {Titles} from "../../utils";

export const ClientCreationPopup = ({triggerButton, setTriggerButton, refreshTable}) => {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const clearValues = () => {
        setName("");
        setEmail("");
        setPhoneNumber("");
    };

    const createRequestBody = () => {
        return (name === "" || email === "" || phoneNumber === "") ? null : ({
            id: window.crypto.randomUUID(),
            name: name,
            email: email,
            phoneNumber: phoneNumber
        })
    };

    useEffect(() => {
        if (triggerButton) {
            clearValues();
        }
    }, [triggerButton]);

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={() => {
                    clearValues();
                    refreshTable();
                }}
            >
                <div className="popupOverlay">
                    <div className="popUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Add New Client</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">

                            <div className="gridItem">
                                <span className="labelField">Name</span>
                                <CustomTextField
                                    className="textField"
                                    label={"Enter client name"}
                                    setText={setName}
                                />
                            </div>

                            <div></div>

                            <div className="gridItem">
                                <span className="labelField">Email</span>
                                <CustomTextField
                                    className="textField"
                                    label={"Enter Email"}
                                    setText={setEmail}
                                />
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Phone number</span>
                                <CustomTextField
                                    className="textField"
                                    label={"Enter phone number"}
                                    setText={setPhoneNumber}
                                />
                            </div>
                        </div>

                        <div className="buttonContainer">
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                requestBody={createRequestBody}
                                type={Titles.clientsPageTitle}
                            >
                                Save
                            </CustomButton>
                        </div>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
