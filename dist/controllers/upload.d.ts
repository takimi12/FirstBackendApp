import type { Request, Response } from "express";
interface FileRequest extends Request {
    file?: Express.Multer.File;
}
declare const uploadImage: (req: FileRequest, res: Response) => Promise<void>;
export default uploadImage;
//# sourceMappingURL=upload.d.ts.map