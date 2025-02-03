import Popup from "reactjs-popup";
import {CustomButton} from "../button/CustomButton";
import {IconXButton} from "../iconButton/IconXButton";
import React, {useContext, useEffect} from "react";
import {generateCSVForRange, Titles} from "../../utils";
import {EmptyFieldsPopup} from "./EmptyFieldsPopup";
import {AppContext} from "../../context";
import dayjs from "dayjs";
import {CustomDatepicker} from "../datepicker/CustomDatepicker";

export const TimeRangePopup = ({triggerButton, setTriggerButton}) => {

    const {filteredServiceOrders} = useContext(AppContext);

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

       return filteredServiceOrders.filter((item) => {
            const date = new Date(item.dateTimeOfService);
            return (
                date >= new Date(startDate) && date <= new Date(endDate)
            );
        });
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
                                type={Titles.profileTitle}
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
