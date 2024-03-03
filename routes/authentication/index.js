import express from "express";
import {
    login,
    signup,
    resendEmail,
    verifyEmail
} from "../../controllers/authentication/index.js";

const authRoutes = express();

authRoutes.post('/login', login);

authRoutes.post('/signup', signup);

authRoutes.post('/:userId/email-verification', verifyEmail);

authRoutes.post('/:userId/resend-email', resendEmail);

export default authRoutes;