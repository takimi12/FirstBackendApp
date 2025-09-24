import type { Request, Response, NextFunction } from "express";
import admin from "../config/firebase.js";

// Rozszerzenie interfejsu Request o cookies
export interface AuthRequest extends Request {
    cookies: {
      Authorization?: string;
      [key: string]: string | undefined;
    };
    user?: admin.auth.DecodedIdToken;
  }
export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.Authorization;

  if (!token) {
    return res.status(401).json({ message: "Brak tokena" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Teraz TS wie, że req.user istnieje
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Nieprawidłowy token" });
  }
};
