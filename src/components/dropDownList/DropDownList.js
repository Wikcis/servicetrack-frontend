import {FormControl, InputLabel, MenuItem, Select, ThemeProvider} from "@mui/material";
import {Theme, Titles} from "../../utils";
import {useState} from "react";

export const DropDownList = ({ columns, onSelectColumn }) => {
    const [selectedColumn, setSelectedColumn] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedColumn(value);
        onSelectColumn(value);
    };

    return (
        <ThemeProvider theme={Theme}>
            <FormControl className="dropDownListContainer">
                <InputLabel id="demo-simple-select-label">{Titles.sortByTitle}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedColumn}
                    label={Titles.sortByTitle}
                    onChange={handleChange}
                >
                    {columns.map((item, index) => item !== "" ? (
                        <MenuItem key={index} value={item}>
                            {item}
                        </MenuItem>
                    ): null )}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};
