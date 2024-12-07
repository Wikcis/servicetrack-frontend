export const sortData = (columnName, columns, filteredData, setFilteredData) => {
    const column = columns.find((col) => col.Header === columnName);
    if (!column) return;


    const sortedData = [...filteredData].sort((a, b) => {
        const valueA = a[column.accessor] ?? '';
        const valueB = b[column.accessor] ?? '';

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
    });
    setFilteredData(sortedData);
};