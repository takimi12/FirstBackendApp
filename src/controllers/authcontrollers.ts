import type { Request, Response } from "express";
import admin from "../config/firebase.js";
import { AppDataSource } from "../data-source.js";
import { User, UserRole } from "../models/user.js";
import { Cart } from "../models/cart.js";

const userRepository = AppDataSource.getRepository(User);
const cartRepository = AppDataSource.getRepository(Cart);

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email i hasło są wymagane" });
  }

  try {
    // Tworzenie użytkownika w Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Zapisanie użytkownika w lokalnej bazie danych
    const newUser = userRepository.create({
      externalId: userRecord.uid, // External ID = UID Firebase
      role: UserRole.GHOST, // Domyślnie rola "ghost"
    });

    await userRepository.save(newUser);

    // 👉 Tworzymy pusty koszyk dla nowego użytkownika
    const cart = cartRepository.create({
      user: newUser,
      items: [],
    });
    await cartRepository.save(cart);

    res
      .status(201)
      .json({ message: "Użytkownik zarejestrowany", user: newUser, cart });
  } catch (error: any) {
    res.status(500).json({ message: "Błąd rejestracji", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email i hasło są wymagane" });
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(401).json({
        message: "Nieprawidłowy email lub hasło",
        error: data.error
      });
    }

    // Sprawdzamy, czy użytkownik istnieje w lokalnej bazie
    const localUser = await userRepository.findOne({
      where: { externalId: data.localId }, // używamy localId z odpowiedzi Firebase
    });

    if (!localUser) {
      return res.status(404).json({ message: "Użytkownik nie istnieje w bazie" });
    }

    // Używamy idToken z odpowiedzi Firebase
    res.cookie("Authorization", data.idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Zalogowano pomyślnie",
      user: localUser,
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Błąd logowania", error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("Authorization", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Wylogowano" });
};
