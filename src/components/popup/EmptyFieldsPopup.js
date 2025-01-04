import Popup from "reactjs-popup";
import {IconXButton} from "../iconButton/IconXButton";
import React from "react";

export const EmptyFieldsPopup = ({triggerButton, setTriggerButton, refreshTable}) => {

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={refreshTable}
            >
                <div className="popupOverlay">
                    <div className="popUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Add New Client</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                    </div>
                </div>
            </Popup>
        </div>
    );
};
