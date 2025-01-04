import Popup from "reactjs-popup";
import {CustomTextField} from "../textField/CustomTextField";
import {CustomButton} from "../button/CustomButton";
import React, {useEffect} from "react";
import {IconXButton} from "../iconButton/IconXButton";
import {DropDownList} from "../dropDownList/DropDownList";
import {Titles} from "../../utils";

export const ServiceOrderCreationPopup = ({triggerButton, setTriggerButton, refreshTable}) => {

    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [date, setDate] = React.useState("");
    const [type, setType] = React.useState("");
    const [format, setFormat] = React.useState("");
    const [description, setDescription] = React.useState("");

    const clearValues = () => {
        setName("");
        setStatus("");
        setDate("");
        setType("");
        setFormat("");
        setDescription("");
    };

    const createRequestBody = () => {
        return (name === "" || description === "" || date === "") ? null : ({
            id: window.crypto.randomUUID(),
            serviceType: type,
            serviceFormat: format,
            serviceDescription: description,
            dateTimeOfService: date,
            status: status,
        })
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
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                requestBody={createRequestBody}
                                type={Titles.serviceOrdersPageTitle}
                            >
                                Save
                            </CustomButton>
                        </div>

                    </div>
                </div>
            </Popup>
        </div>
    );
}