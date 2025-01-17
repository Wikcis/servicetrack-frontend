import { TextField, ThemeProvider } from "@mui/material";
import {isAlpha, isNumeric, Theme} from "../../utils";
import React, { useState } from "react";

export const CustomTextField = ({ label, setText, maxLength, alpha, numeric}) => {
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        if (alpha && !isAlpha(inputValue)) {
            setError(true);
            setHelperText("Only alphabetic characters are allowed.");
            setText(inputValue);
            return;
        }

        if (numeric && !isNumeric(inputValue)) {
            setError(true);
            setHelperText("Only numeric characters are allowed.");
            setText(inputValue);
            return;
        }

        setError(false);
        setHelperText("");
        setText(inputValue);
    };

    return (
        <ThemeProvider theme={Theme}>
            <TextField
                id={error ? "outlined-error-helper-text" : "outlined-basic"}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                label={label}
                color="primary"
                error={error}
                helperText={helperText}
                inputProps={{ maxLength: maxLength }}
            />
        </ThemeProvider>
    );
};
