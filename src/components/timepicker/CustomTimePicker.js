import {ThemeProvider} from "@mui/material";
import {Theme} from "../../utils"
import React, {useState} from "react";
import {TimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en-gb';

export const CustomTimePicker = ({onSelectedTime, title, className}) => {

    const [selectedTime, setSelectedTime] = useState();

    const handleChange = (time) => {
        setSelectedTime(time);
        onSelectedTime(time.format("HH:mm:ss"));
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
            <ThemeProvider theme={Theme}>
                <TimePicker
                    className={className}
                    label={title}
                    value={selectedTime}
                    onChange={handleChange}
                    format="HH:mm"
                />
            </ThemeProvider>
        </LocalizationProvider>
    )
}