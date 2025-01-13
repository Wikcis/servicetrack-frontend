import Popup from "reactjs-popup";
import {CustomTextField} from "../textField/CustomTextField";
import {CustomButton} from "../button/CustomButton";
import React, {useEffect} from "react";
import {IconXButton} from "../iconButton/IconXButton";
import {Titles} from "../../utils";
import {EmptyFieldsPopup} from "./EmptyFieldsPopup";

export const TechnicianCreationPopup = ({triggerButton, setTriggerButton, refreshTable}) => {

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);

    const clearValues = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
    };

    const createRequestBody = () => {

        if (firstName === "" || lastName === "" || email === "" || phoneNumber === "") {
            setEmptyWarningTrigger(true);
            return null;
        }

        return {
            id: window.crypto.randomUUID(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
        };
    }

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
                            <h3 className="popupTitle">Add New Technician</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">
                            <div className="gridItem">
                                <span className="labelField">Enter first name</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"First Name"}
                                        setText={setFirstName}
                                    />
                                </span>

                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter last name</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Last Name"}
                                        setText={setLastName}
                                    />
                                </span>
                            </div>


                            <div className="gridItem">
                                <span className="labelField">Enter Email</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Email"}
                                        setText={setEmail}
                                    />
                                </span>
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter phone number</span>
                                <span className="textField">
                                    <CustomTextField
                                        label={"Phone number"}
                                        setText={setPhoneNumber}
                                    />
                                </span>
                            </div>
                        </div>

                        <div className="buttonContainer">
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                requestBody={createRequestBody}
                                type={Titles.techniciansPageTitle}
                            >
                                Save
                            </CustomButton>
                        </div>

                    </div>
                </div>

                <EmptyFieldsPopup
                    triggerButton={emptyWarningTrigger}
                    setTriggerButton={setEmptyWarningTrigger}
                />
            </Popup>
        </div>
    );
};
