import User from "../../model/users.js";
import {
    authenticateUser,
    generateTokens,
    hashPassword,
    userSignupSchema
} from "../../helpers/helper.js";
import MailLink from "../../model/mailVerification.js";
import sendEmail from "../../utils/sendEmail.js";
import crypto from "crypto"

const signup = async (req, res, next) => {

    try {
        const data = req.body;
        const { error, value: userData } = userSignupSchema.validate(data);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const hashedPassword = await hashPassword(data.password, next);
        const newUser = new User({ ...userData, password: hashedPassword });
        const user = await newUser.save();

        const link = crypto.randomBytes(32).toString("hex")
        const hashLink = await hashPassword(link, next)
        await new MailLink({
            userId: user._id,
            link: hashLink
        }).save();

        const url = `${process.env.BASE_URL}/auth/${user.id}/verify/${link}`
        await sendEmail(user.email, "Verify Email", url, next)

        res.status(201).send({ message: "An email sent to your account please verify" })

    } catch (error) {
        next(error)
    }
};

const verifyLink = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.params.userId
        }).select("_id email");
        if (!user) return res.status(400).send({ message: "Invalid link" })

        const mailLink = await MailLink.findOne({
            userId: user._id
        }).select("-_id link");

        if (!mailLink) return res.status(400).send({ message: "Invalid link" })

        await User.updateOne(
            { _id: user._id },
            { verified: true }
        );
        await MailLink.deleteOne({ _id: mailLink._id });

        const { accessToken, refreshToken } = generateTokens(user?.email, next);

        res.status(200).json({
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`
        });
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const data = req.body;

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

export {
    login,
    signup,
    verifyLink
}
