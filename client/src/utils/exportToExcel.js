import * as XLSX from 'xlsx';

/**
 * Exports data to an Excel file.
 * @param {Array<Object>} data - The data to export.
 * @param {string} filename - The name of the file to save (without extension).
 * @param {string} sheetName - The name of the worksheet.
 */
export function exportToExcel(data, filename = 'export', sheetName = 'Sheet1') {
    if (!data || !data.length) {
        console.warn('No data to export');
        return;
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${filename}.xlsx`);
}
