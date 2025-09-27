import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import admin from "../config/firebase.js";
import { rollbar } from "../rollbar-config.js";

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

const uploadImage = async (req: FileRequest, res: Response): Promise<void> => {
  console.log("==== New upload request ====");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    if (!req.file) {
      console.error("No file found in request!");
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const bucket = admin.storage().bucket();
    if (!bucket) {
      console.error("Firebase Storage bucket not configured!");
      throw new Error("Firebase Storage bucket not configured");
    }

    const extension = req.file.originalname.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;
    const file = bucket.file(fileName);

    console.log("Uploading file:", fileName);

    const stream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype },
      public: true,
    });

    stream.on("error", (err) => {
      console.error("Stream upload error:", err);
      rollbar.error("Stream upload error", { err }, { request: req });
      res.status(500).json({ message: "Failed to upload image" });
    });

    stream.on("finish", async () => {
      try {
        await file.makePublic();
        const publicUrl = file.publicUrl();
        console.log("Upload successful! Public URL:", publicUrl);
        res.status(200).json({ message: "Image uploaded successfully", url: publicUrl });
      } catch (pubErr) {
        console.error("Error making file public:", pubErr);
        rollbar.error("Make public error", { pubErr }, { request: req });
        res.status(500).json({ message: "Failed to make file public" });
      }
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error("Upload error caught in catch:", error);
    rollbar.error("Upload error", { error }, { request: req });
    res.status(500).json({ message: "Failed to upload: Storage configuration error" });
  }
};

export default uploadImage;
