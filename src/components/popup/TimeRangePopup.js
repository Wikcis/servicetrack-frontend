import Popup from "reactjs-popup";
import {CustomButton} from "../button/CustomButton";
import {IconXButton} from "../iconButton/IconXButton";
import React, {useContext, useEffect} from "react";
import {generateCSVForRange} from "../../utils";
import {EmptyFieldsPopup} from "./EmptyFieldsPopup";
import {ApiContext} from "../../context";
import dayjs from "dayjs";
import {CustomDatepicker} from "../datepicker/CustomDatepicker";

export const TimeRangePopup = ({triggerButton, setTriggerButton}) => {

    const {serviceOrders} = useContext(ApiContext);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const [emptyWarningTrigger, setEmptyWarningTrigger] = React.useState(false);

    const clearValues = () => {
        setStartDate("");
        setEndDate("");
    };

    useEffect(() => {
        if (triggerButton) {
            clearValues();
        }
    }, [triggerButton]);

    const filterData = () => {
        console.log("temp: 32123123123");
        const tmp =  serviceOrders.filter((item) => {
            const date = new Date(item.dateTimeOfService);
            return (
                date >= new Date(startDate) && date <= new Date(endDate)
            );
        });
        console.log("temp: " + tmp);
        return tmp;
    };

    return (
        <div>
            <Popup
                open={triggerButton}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={() => {
                    clearValues();
                }}
            >
                <div className="popupOverlay">
                    <div className="singleColumnPopUpContainer">

                        <div className="popupHeader">
                            <h3 className="popupTitle">Select Time Range</h3>
                            <IconXButton className="closeButton" setTriggerButton={setTriggerButton}/>
                        </div>

                        <div className="gridContainer">

                            <div className="gridItem">
                                <span className="labelField">Enter beginning of time range</span>
                                <CustomDatepicker
                                    className="popUpDatepicker"
                                    title="Start Date"
                                    onSelectedDate={setStartDate}
                                    minDate={dayjs("2020-01-01")}
                                    maxDate={dayjs("2035-12-31")}
                                />
                            </div>

                            <div className="gridItem">
                                <span className="labelField">Enter ending of time range</span>
                                <CustomDatepicker
                                    className="popUpDatepicker"
                                    title="End Date"
                                    onSelectedDate={setEndDate}
                                    minDate={dayjs("2020-01-01")}
                                    maxDate={dayjs("2035-12-31")}
                                />
                            </div>

                        </div>

                        <div className="buttonContainer">
                            <CustomButton
                                className="saveButton"
                                setTriggerButton={setTriggerButton}
                                generateCSV={generateCSVForRange}
                                data={filterData}
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
