import User from "../../model/users.js";
import {
    authenticateUser,
    generateTokens,
    hashPassword,
    userLoginSchema,
    userSignupSchema
} from "../../helpers/helper.js";

const signup = async (req, res, next) => {

    try {
        const data = req.body;
        const { error, value: userData } = userSignupSchema.validate(data);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const hashedPassword = await hashPassword(data.password);
        const newUser = new User({ ...userData, password: hashedPassword });
        await newUser.save();

        const { accessToken, refreshToken } = generateTokens(data.email);

        res.status(200).json({
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`
        });

    } catch (error) {
        next(e)
    }
};

const login = async (req, res, next) => {
    try {
        const data = req.body;
        const { error } = userLoginSchema.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const userData = await User.findOne(
            { email: data.email }
        ).select("-_id email password");

        if (userData) {
            const info = {
                email: data.email,
                dbEmail: userData.email,
                password: data.password,
                dbPassword: userData.password
            }
            const authenticated = await authenticateUser(info, next)
            if (authenticated) {
                const { accessToken, refreshToken } = generateTokens(data.email);
                res.status(200).json({
                    accessToken: `Bearer ${accessToken}`,
                    refreshToken: `Bearer ${refreshToken}`
                });
            } else {
                res.status(401).json({ message: "Invalid user name or password" })
            }
        } else {
            res.status(401).json({ message: "Invalid user name or password" })
        }

    } catch (e) {
        next(e)
    }
}

export { login, signup }
