import express from "express";
import { login, signup } from "../../controllers/authentication/index.js";

const authRoutes = express();

authRoutes.post('/login', login);

authRoutes.post('/signup', signup);

export default authRoutes;