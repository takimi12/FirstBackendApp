import admin from "../config/firebase.js";
export const verifyToken = async (req, res, next) => {
    // Pobranie tokena z nagłówka lub ciasteczka
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.Authorization;
    if (!token) {
        return res.status(401).json({ message: "Brak tokena" });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // dodajemy user do request
        return next();
    }
    catch (error) {
        console.error("Błąd weryfikacji tokena:", error);
        return res.status(403).json({ message: "Nieprawidłowy token" });
    }
};
//# sourceMappingURL=isAuth.js.map