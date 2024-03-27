/**
 * It receives a table from Material React Table as a parameter and converts its data into a form that react-csv understands (formatted based on the columns and rows visible to the user).
 * @param {MRT_TableInstance} table
 * @returns An array containing the formatting for CSV export.
 */
export default function exportToCSV(table) {
    const csv = [];

    const visibleColumns = table.getVisibleFlatColumns();

    csv.push(visibleColumns.filter(column => column.columnDef?.header !== "Selecionar").map(column => column.columnDef?.header ?? 'no header'));

    let rows = table.getFilteredRowModel().rows.map(row => row.original);

    if (table.getSelectedRowModel().rows.length > 0) {
        rows = table.getSelectedRowModel().rows.map(row => row.original);
    }

    rows.forEach(row => {
        const rowData = [];
        visibleColumns.forEach(column => {
            if (csv[0].includes(column.columnDef.header)) {
                const value = row[column.columnDef.accessorKey];
                rowData.push(value);
            }
        });
        csv.push(rowData);
    });

    return csv;
};
