import type { Request, Response } from "express";
import ExcelJS from "exceljs";
import { parse } from "csv-parse";

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

export const convertSpreadsheet = async (req: FileRequest, res: Response) => {
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
    } else {
      // Przetwarzanie Excela
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(req.file.buffer);

      const result: any = {};

      workbook.worksheets.forEach((worksheet) => {
        const sheetData: any[] = [];

        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // pomijamy nagłówki

          const rowData: any = {};
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
  } catch (error) {
    console.error("File conversion error:", error);
    res.status(500).json({ message: "Error converting file to JSON" });
  }
};
