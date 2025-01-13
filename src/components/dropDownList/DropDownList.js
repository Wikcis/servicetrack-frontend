import {FormControl, InputLabel, MenuItem, Select, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils";
import {useState} from "react";

export const DropDownList = ({ columns, onSelectColumn, title, className }) => {
    const [selectedColumn, setSelectedColumn] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedColumn(value);
        onSelectColumn(value);
    };

    return (
        <ThemeProvider theme={Theme}>
            <FormControl className={className}>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedColumn}
                    label={title}
                    onChange={handleChange}
                >
                    {columns.map((item, index) => item !== "" ? (
                        <MenuItem key={index} value={item.accessor}>
                            {item.Header}
                        </MenuItem>
                    ): null )}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};
