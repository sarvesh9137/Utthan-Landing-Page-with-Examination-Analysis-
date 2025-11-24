// ExportButton.jsx
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportButton({ data, fileName = "students.xlsx" }) {
  const handleExport = () => {
    if (!data || !data.length) return alert("No data to export");
    // convert to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), fileName);
  };

  return (
    <button onClick={handleExport} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">
      Export to Excel
    </button>
  );
}
