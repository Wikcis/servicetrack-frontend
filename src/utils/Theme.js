import {createTheme} from "@mui/material";
import {colors} from "../styles";

const createColor = (mainColor) => {
    const {palette} = createTheme();
    return palette.augmentColor({color: {main: mainColor}});
};

export const Theme = createTheme({
    palette: {
        primary: createColor(colors.primary),
        iconButton: createColor(colors.icons),
    },

    typography: {
        button: {
            fontSize: 16,
            fontWeight: 500,
        }
    }
});
