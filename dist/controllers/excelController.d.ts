import type { Request, Response } from "express";
interface FileRequest extends Request {
    file?: any;
}
export declare const convertSpreadsheet: (req: FileRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=excelController.d.ts.map