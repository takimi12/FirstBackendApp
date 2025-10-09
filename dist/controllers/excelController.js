import ExcelJS from "exceljs";
import { parse } from "csv-parse";
export const convertSpreadsheet = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const isCSV = req.file.mimetype === "text/csv";
        if (isCSV) {
            // Przetwarzanie CSV
            const parser = parse(req.file.buffer, {
                columns: true,
                skip_empty_lines: true,
                trim: true,
            });
            const records = [];
            for await (const record of parser) {
                records.push(record);
            }
            res.json({
                message: "CSV converted successfully",
                data: { Sheet1: records },
            });
        }
        else {
            // Przetwarzanie Excela
            const workbook = new ExcelJS.Workbook();
            // 🔹 użycie any dla buffer
            const buffer = req.file.buffer;
            await workbook.xlsx.load(buffer);
            const result = {};
            workbook.worksheets.forEach((worksheet) => {
                const sheetData = [];
                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1)
                        return; // pomijamy nagłówki
                    const rowData = {};
                    row.eachCell((cell, colNumber) => {
                        const header = worksheet.getRow(1).getCell(colNumber).value;
                        rowData[header?.toString() || `column${colNumber}`] = cell.value;
                    });
                    sheetData.push(rowData);
                });
                result[worksheet.name] = sheetData;
            });
            res.json({
                message: "Excel converted successfully",
                data: result,
            });
        }
    }
    catch (error) {
        console.error("File conversion error:", error);
        res.status(500).json({ message: "Error converting file to JSON" });
    }
};
//# sourceMappingURL=excelController.js.map