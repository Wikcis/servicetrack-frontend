import {TextField, ThemeProvider} from "@mui/material";
import {Theme} from "../../utils"

export const CustomTextField = ({ label, setText }) => {

    const handleInputChange = (text) => {
        setText(text.target.value);
    }

    return (
        <div className="customTextField">
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
        </div>

    )
}