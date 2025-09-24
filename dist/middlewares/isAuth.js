import admin from "../config/firebase.js";
export const verifyToken = async (req, res, next) => {
    const token = req.cookies?.Authorization;
    if (!token) {
        return res.status(401).json({ message: "Brak tokena" });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Teraz TS wie, że req.user istnieje
        return next();
    }
    catch (error) {
        return res.status(403).json({ message: "Nieprawidłowy token" });
    }
};
//# sourceMappingURL=isAuth.js.map