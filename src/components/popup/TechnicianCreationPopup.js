import Popup from "reactjs-popup";
import {CustomTextField} from "../textField/CustomTextField";
import {CustomButton} from "../button/CustomButton";
import React from "react";
import {IconXButton} from "../iconButton/IconXButton";

export const TechnicianCreationPopup = ({triggerButton, setTriggerButton}) => {

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
            >
                <div className="popupOverlay">
                    <div className="popUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Add New Technician</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton} />
                        </div>

                        <div className="gridContainer">
                            <div className="gridItem">
                                <span className="labelField">Name</span>
                                <CustomTextField
                                    className="textField"
                                    label={"Enter first name"}
                                    setText={setFirstName}
                                />
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Name</span>
                                <CustomTextField
                                    className="textField"
                                    label={"Enter last name"}
                                    setText={setLastName}
                                />
                            </div>


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
                            <CustomButton setTriggerButton={setTriggerButton}>Save</CustomButton>
                        </div>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
