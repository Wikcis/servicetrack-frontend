import Popup from "reactjs-popup";
import {CustomTextField} from "../textField/CustomTextField";
import {CustomButton} from "../button/CustomButton";
import React from "react";
import {IconXButton} from "../iconButton/IconXButton";
import {DropDownList} from "../dropDownList/DropDownList";

export const ServiceOrderCreationPopup = ({triggerButton, setTriggerButton}) => {

    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [date, setDate] = React.useState("");
    const [type, setType] = React.useState("");
    const [format, setFormat] = React.useState("");
    const [description, setDescription] = React.useState("");

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
                            <h3 className="popupTitle">Add New Service Order</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">
                            <div className="gridItem">
                                <span className="labelField">Client Name</span>
                                <CustomTextField
                                    className="textField"
                                    label={"Enter client name"}
                                    setText={setName}
                                />
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Status</span>
                                {/*<DropDownList*/}
                                {/*    className="textField"*/}
                                {/*    label={"Enter Email"}*/}
                                {/*/>*/}
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Date of service</span>
                                {/*<CustomTextField*/}
                                {/*    className="textField"*/}
                                {/*    label={"Pick Date"}*/}
                                {/*    setText={setDate}*/}
                                {/*/>*/}
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Type</span>
                                {/*<CustomTextField*/}
                                {/*    className="textField"*/}
                                {/*    label={"Select service type"}*/}
                                {/*    setText={setStatus}*/}
                                {/*/>*/}
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Format</span>
                                {/*<CustomTextField*/}
                                {/*    className="textField"*/}
                                {/*    label={"Select service format"}*/}
                                {/*    setText={setFormat}*/}
                                {/*/>*/}
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Description</span>
                                <CustomTextField
                                    className="textField"
                                    label={"Enter description of the service"}
                                    setText={setDescription}
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
}