import {createTheme} from "@mui/material";
import {colors} from "../styles";

export const mapAccessorToHeader = (value, mappingArray) => {
    const match = mappingArray.find(item => item.accessor === value);
    return match ? match.Header : value;
};

export const sortData = (columnName, columns, filteredData, setFilteredData) => {

    const column = columns.find((col) => col.accessor === columnName);

    if (!column) {
        console.error(`Column with accessor "${columnName}" not found.`);
        return;
    }

    const sortedData = [...filteredData].sort((a, b) => {
        const valueA = a[column.accessor];
        const valueB = b[column.accessor];

        if (valueA == null && valueB == null) return 0;
        if (valueA == null) return -1;
        if (valueB == null) return 1;

        if (!isNaN(valueA) && !isNaN(valueB)) {
            return parseFloat(valueA) - parseFloat(valueB);
        }

        return String(valueA).localeCompare(String(valueB), undefined, { numeric: true });
    });

    setFilteredData(sortedData);
};


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
