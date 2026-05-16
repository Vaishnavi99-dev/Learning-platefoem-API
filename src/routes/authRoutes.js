import express from "express";
import { login } from "../auth/authController.js";

const authRoutes = express.Router();

authRoutes.post(
    "/login",
    login
);

export default authRoutes;