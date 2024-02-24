import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

export const hashPassword = async (password, next) => {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (e) {
        next(e)
    }
};

export const userSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const authenticateUser = async (data, next) => {
    try {
        const isMatch = await bcrypt.compare(data.password, data.dbPassword)
        if (data.email === data.dbEmail && isMatch) {
            return true
        } else {
            return false
        }
    } catch (e) {
        next(e)
    }
}

export const generateTokens = (email) => {
    const refreshToken = jwt.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '30d' }
    );

    const accessToken = jwt.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 1200 }
    );

    return { accessToken, refreshToken };
};