import {createTheme} from "@mui/material";
import {colors} from "../styles";
import {TableColumns} from "../components";
import {Titles} from "./Values";

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

const generateCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
};

const mapCSVContent = (orders) => {
    const columns = TableColumns(Titles.serviceOrdersPageTitle);

    const headers = columns.map(column => column.Header);

    headers.shift();

    return [
        headers.join(","),
        ...orders.map(order =>
            columns.slice(1).map(column => `"${order[column.accessor] || ''}"`).join(",")
        )
    ].join('\n');
}

export const generateCSVForRange = (orders) => {

    const content = mapCSVContent(orders)

    generateCSV(content, "serviceOrdersInRange.csv");
};

export const generateCSVForClient = (orders) => {

    const content = mapCSVContent(orders)

    generateCSV(content, "serviceOrdersForClient.csv");
};

export const isNumeric = (inputValue) => {
    return /^\d*$/.test(inputValue);
}

export const isAlpha = (inputValue) => {
    return /^[a-zA-Z]*$/.test(inputValue);
}

