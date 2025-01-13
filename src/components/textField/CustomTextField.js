import {TextField, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils"

export const CustomTextField = ({label, setText, className}) => {

    const handleInputChange = (text) => {
        setText(text.target.value);
    }

    return (
        <ThemeProvider theme={Theme}>
            <TextField
                id="outlined-basic"
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                label={label}
                color="primary"
            />
        </ThemeProvider>
    )
}