import { createTheme } from "@mui/material";
import { colors } from "../styles/constants/colors";

const createColor = (mainColor) => {
    const { palette } = createTheme();
    return palette.augmentColor({ color: { main: mainColor } });
};

export const Theme = createTheme({
    palette: {
        primary: createColor(colors.primary),
    },
});
