import type { Request, Response, NextFunction } from "express";
import admin from "../config/firebase.js";

// Rozszerzamy Request o user
export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Pobranie tokena z nagłówka lub ciasteczka
  const token =
    req.headers.authorization?.replace("Bearer ", "") || req.cookies?.Authorization;

  if (!token) {
    return res.status(401).json({ message: "Brak tokena" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // dodajemy user do request
    return next();
  } catch (error) {
    console.error("Błąd weryfikacji tokena:", error);
    return res.status(403).json({ message: "Nieprawidłowy token" });
  }
};
